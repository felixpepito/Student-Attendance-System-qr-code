import React, { useState } from 'react';
const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="py-4 text-white bg-red-600 shadow-md">
                <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
            </header>

            <main className="p-6">
                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold">User Management</h2>
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600">View Users</button>
                        <button className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600">Add New User</button>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold">Attendance Records</h2>
                    <button className="px-4 py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600">View All Attendance</button>
                </section>

                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold">Reports</h2>
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 text-white transition bg-purple-500 rounded hover:bg-purple-600">Generate CSV</button>
                        <button className="px-4 py-2 text-white transition bg-purple-500 rounded hover:bg-purple-600">Generate PDF</button>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold">System Settings</h2>
                    <button className="px-4 py-2 text-white transition bg-yellow-500 rounded hover:bg-yellow-600">Manage Settings</button>
                </section>
            </main>

            <footer className="py-4 text-center text-white bg-gray-800">
                <p>Attendance Management System © 2024</p>
            </footer>
        </div>
    );
};

export default AdminDashboard;
