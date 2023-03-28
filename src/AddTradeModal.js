import React, { Component } from "react";
import { Modal, Form, Input, Select, message } from "antd";

const { Option } = Select;

class AddTradeModal extends Component {
    formRef = React.createRef();

    handleSubmit = () => {
        const { onAddTrade, onCancel } = this.props;
        this.formRef.current
            .validateFields()
            .then((values) => {
                if (values.notional < 0) {
                    throw new Error("Notional must be greater than or equal to 0");
                }
                onAddTrade(values);
                this.formRef.current.resetFields();
                onCancel();
            })
            .catch((errorInfo) => {
                console.log("Validation Failed:", errorInfo);
                message.error(errorInfo.message);
            });
    };


    render() {
        const { visible, onCancel } = this.props;
        return (
            <Modal
                open={visible}
                title="Add Trade"
                okText="Submit"
                onCancel={onCancel}
                onOk={this.handleSubmit}
            >
                <Form ref={this.formRef} layout="vertical">
                    <Form.Item
                        type="text"
                        name="product"
                        label="Product Name"
                        rules={[
                            {
                                required: true,
                                message: "Please enter a product name",
                            },
                        ]}
                    >
                        <Input placeholder="Enter product name" />
                    </Form.Item>
                    <Form.Item
                        name="notional"
                        label="Notional"
                        rules={[
                            {
                                required: true,
                                message: "Please enter a notional",
                            },
                        ]}
                    >
                        <Input type="number" placeholder="Enter notional" />
                    </Form.Item>
                    <Form.Item
                        name="direction"
                        label="Direction"
                        rules={[
                            {
                                required: true,
                                message: "Please select a direction",
                            },
                        ]}
                    >
                        <Select placeholder="Select direction">
                            <Option value="Buy">Buy</Option>
                            <Option value="Sell">Sell</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default AddTradeModal;