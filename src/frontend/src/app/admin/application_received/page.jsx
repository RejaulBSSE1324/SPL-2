"use client"
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [availableSeats, setAvailableSeats] = useState([]);
    const [form] = Form.useForm();
    const [statusFilter, setStatusFilter] = useState('pending'); // State for filtering applications

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5555/applications');
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableSeats = async () => {
        try {
            const response = await axios.get('http://localhost:5555/seats');
            const availableSeats = response.data.filter(seat => seat.status === 'Available');
            setAvailableSeats(availableSeats);
        } catch (error) {
            console.error('Error fetching available seats:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredApplications = applications.filter(application => {
        switch (statusFilter) {
            case 'pending':
                return application.status === 'pending';
            case 'allocated':
                return application.status === 'allocated';
            case 'rejected':
                return application.status === 'rejected';
            default:
                return true; // Show all applications if filter is not applied
        }
    });

    const handleAllocate = async (application) => {
        setSelectedApplication(application);
        setVisible(true);
        await fetchAvailableSeats();
    };

    const handleReject = async (application) => {
        try {
            await axios.post('http://localhost:5555/applications/reject', { regnumber: application.regnumber });
            message.success('Application rejected successfully');
            fetchData();
        } catch (error) {
            message.error('Failed to reject application');
        }
    };

    const handleModalCancel = () => {
        setVisible(false);
    };

    const handleModalSubmit = async () => {
        try {
            const values = await form.validateFields();
            const { seatId } = values;
            const { regnumber, fname, lname } = selectedApplication;

            await axios.post('http://localhost:5555/seats/allocate', {
                seatId,
                registrationNumber: regnumber,
                studentName: `${fname} ${lname}`
            });

            message.success('Seat allocated successfully');
            setVisible(false);
            fetchData();
        } catch (error) {
            message.error('Failed to allocate seat');
        }
    };

    const handleFilterChange = (value) => {
        setStatusFilter(value); // Update status filter
    };

    const columns = [
        {
            title: 'Registration Number',
            dataIndex: 'regnumber',
            key: 'regnumber',
        },
        {
            title: 'First Name',
            dataIndex: 'fname',
            key: 'fname',
        },
        {
            title: 'Last Name',
            dataIndex: 'lname',
            key: 'lname',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleAllocate(record)}>Allocate</Button>
                    <Button className='!border-[1px] !border-[red]' onClick={() => handleReject(record)}>Reject</Button>
                </Space>
            ),
        },
    ];

    return (
        <div className='w-full md:min-w-full flex flex-col gap-4 m-4 items-center'>
            <Select defaultValue="pending" style={{ width: 120, marginBottom: 16 }} onChange={handleFilterChange}>
                <Option value="pending">Pending</Option>
                <Option value="allocated">Allocated</Option>
                <Option value="rejected">Rejected</Option>
            </Select>

            <div className='w-full '>
                <Table
                    columns={columns}
                    dataSource={filteredApplications}
                    loading={loading}
                    rowKey="regnumber"
                />

            </div>
            <Modal
                title="Allocate Seat"
                visible={visible}
                onCancel={handleModalCancel}
                onOk={handleModalSubmit}
                destroyOnClose
            >
                <Form form={form}>
                    <Form.Item
                        name="seatId"
                        label="Select Seat"
                        rules={[{ required: true, message: 'Please select a seat!' }]}
                    >
                        <Select placeholder="Select a seat">
                            {availableSeats.map(seat => (
                                <Option key={seat._id} value={seat._id}>
                                    {`${seat.buildingName}, Room ${seat.roomNumber}, Seat ${seat.seatNumber}`}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Applications;
