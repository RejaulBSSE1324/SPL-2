// Updated SeatManagement component
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Select, Spin, message } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const { Option } = Select;

function SeatManagement() {
    const [seats, setSeats] = useState([]);
    const [filteredSeats, setFilteredSeats] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentSeat, setCurrentSeat] = useState(null);
    const [loading, setLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');
    const [pendingApplications, setPendingApplications] = useState([]);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [seatId, setSelectedSeatId] = useState('');
    const [form] = Form.useForm();

    useEffect(() => {
        fetchSeatData();
        fetchApplications();
    }, []);

    useEffect(() => {
        filterSeats();
    }, [statusFilter, seats]);

    const fetchSeatData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5555/seats');
            if (Array.isArray(response.data)) {
                setSeats(response.data);
            } else {
                console.error("Fetched data is not an array:", response.data);
            }
        } catch (error) {
            console.error("Error fetching seat data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchApplications = async () => {
        try {
            const response = await axios.get('http://localhost:5555/applications');
            const pendingApps = response.data.filter(app => app.status === 'pending');
            setPendingApplications(pendingApps);
        } catch (error) {
            console.error("Error fetching applications:", error);
        }
    };

    const filterSeats = () => {
        setLoading(true);
        setTimeout(() => {
            if (statusFilter) {
                setFilteredSeats(seats.filter(seat => seat.status === statusFilter));
            } else {
                setFilteredSeats(seats);
            }
            setLoading(false);
        }, 500); // Simulate a delay for the loading spinner
    };

    const handleAllocateClick = (seat) => {
        setCurrentSeat(seat);
        setIsModalVisible(true);
    };

    const handleDeallocateClick = async (seat) => {
        try {
            await axios.post(`http://localhost:5555/seats/deallocate`, { seatId: seat._id });
            message.success("Seat de-allocated successfully!");
            fetchSeatData();
        } catch (error) {
            message.error("Failed to de-allocate seat.");
            console.error("Error de-allocating seat:", error);
        }
    };

    const handleFormSubmit = async () => {
        try {
            if (!selectedApplication) {
                message.error("Please select a student application.");
                return;
            }

            const { regnumber, fname, lname } = selectedApplication;

            await axios.post(`http://localhost:5555/seats/allocate`, {
                seatId: currentSeat._id,
                registrationNumber: regnumber,
                studentName: `${fname} ${lname}`
            });

            message.success("Seat allocated successfully!");
            setIsModalVisible(false);
            fetchSeatData();
        } catch (error) {
            message.error("Failed to allocate seat.");
            console.error("Error allocating seat:", error);
        }
    };

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleSelectChange = (value) => {
        const selectedApp = pendingApplications.find(app => app.regnumber === value);
        setSelectedApplication(selectedApp);
    };

    const columns = [
        {
            title: 'Seat Number',
            dataIndex: 'seatNumber',
            key: 'seatNumber',
        },
        {
            title: 'Room Number',
            dataIndex: 'roomNumber',
            key: 'roomNumber',
        },
        {
            title: 'Floor Number',
            dataIndex: 'floorNumber',
            key: 'floorNumber',
        },
        {
            title: 'Building Name',
            dataIndex: 'buildingName',
            key: 'buildingName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Student Name',
            dataIndex: 'student.name',
            key: 'studentName',
            render: (text, record) => record.student ? `${record.student.name}` : '-'
        },
        {
            title: 'Registration Number',
            dataIndex: 'student.reg',
            key: 'registrationNumber',
            render: (text, record) => record.student ? `${record.student.reg}` : '-'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                record.status === 'Occupied' ? (
                    <Button onClick={() => handleDeallocateClick(record)}>De-allocate</Button>
                ) : (
                    <Button onClick={() => { setSelectedSeatId(record._id); handleAllocateClick(record) }}>Allocate</Button>
                )
            ),
        },
    ];

    return (
        <div style={{ textAlign: 'center' }} className='m-5'>
            <h6 style={{ fontWeight: 'bold' }} className='p-5'>Allocated Seats</h6>
            <div style={{ marginBottom: '20px' }}>
                <Select
                    defaultValue=""
                    style={{ width: 200 }}
                    onChange={handleStatusFilterChange}
                    suffixIcon={<FilterOutlined />}
                >
                    <Option value="">All</Option>
                    <Option value="Occupied">Occupied</Option>
                    <Option value="Available">Available</Option>
                </Select>
            </div>
            {loading ? (
                <Spin tip="Loading...">
                    <Table
                        dataSource={filteredSeats}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                        style={{ margin: '20px 0', fontSize: '18px' }}
                    />
                </Spin>
            ) : (
                    <Table
                        dataSource={filteredSeats}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                        style={{ margin: '20px 0', fontSize: '18px' }}
                    />
                )}
            <Modal
                title="Allocate Seat"
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={[
                    <Button key="cancel" onClick={handleModalCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleFormSubmit}>
                        Submit
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="studentName"
                        label="Select Student"
                        rules={[{ required: true, message: 'Please select a student!' }]}
                    >
                        <Select placeholder="Select a student" onChange={handleSelectChange}>
                            {pendingApplications.map(application => (
                                <Option key={application.regnumber} value={application.regnumber}>
                                    {`${application.fname} ${application.lname} (${application.regnumber})`}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default SeatManagement;
