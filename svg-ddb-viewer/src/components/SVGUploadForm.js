// Imports
import React from "react";
import { Form, Input, Button } from "antd";
const isSVG = require("is-svg");

// upload SVG from container
export default function SVGUploadForm({ updateSVG }) {
    const [form] = Form.useForm(); // form for uploading SVG

    // handler for upload 
    const onSubmit = (formData) => {
        // build the new SVG from the uploaded data
        let newSVG = {
            title: formData.title,
            svg: formData.svg,
        };

        // verify SVG
        if (isSVG(newSVG.svg)) {
            updateSVG(newSVG);
            // confirm SVG submission
            alert(`SVG ${newSVG.title} has been submitted to GUN.`);
        } else {
            // error response for invalid SVG
            alert(`${newSVG.title} is not a valid SVG.`);
        }

        // clear form 
        form.resetFields();
    };

    // error alert for invalid SVG
    const onFinishFailed = (errorInfo) => {
        console.log("Failed SVG input:", errorInfo);
    };

    // return component for form
    return (
        <>
            {/* define struct of form */}
            <Form
                name="svg-upload-form"
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: false }}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                {/* title input */}
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a title for the SVG.",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                {/* SVG data input */}
                <Form.Item
                    label="SVG"
                    name="svg"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a valid SVG as a string.",
                        },
                    ]}
                >
                    <Input.TextArea rows={15} />
                </Form.Item>

                {/* submit btn */}
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </>
    );
}