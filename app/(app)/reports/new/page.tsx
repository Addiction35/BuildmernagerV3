'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    search: '',
    projectId: '',
    startDate: '',
    endDate: '',
    vendorName: '',
    clientName: '',
    company: '',
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['reports', filters],
    queryFn: async () => {
      const params = {};
      for (const key in filters) {
        if (filters[key]) params[key] = filters[key];
      }
      const res = await axiosInstance.get('/search', { params });
      return res.data.data;
    },
    enabled: false, // fetch only when user clicks search
  });

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = () => {
    refetch();
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="search"
          placeholder="General Search"
          value={filters.search}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="projectId"
          placeholder="Project ID"
          value={filters.projectId}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="vendorName"
          placeholder="Vendor Name"
          value={filters.vendorName}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={filters.clientName}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={filters.company}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>

      {/* Results */}
      {isFetching && <p>Loading...</p>}

      {data?.length > 0 &&
        data.map((projectBlock) => (
          <div key={projectBlock.project._id} className="border p-4 rounded shadow space-y-4">
            <h2 className="text-xl font-semibold">
              {projectBlock.project.name} ({projectBlock.project._id})
            </h2>
            <p>
              Client: {projectBlock.project.client?.primaryContact || 'N/A'} | Company: {projectBlock.project.company || 'N/A'}
            </p>

            {/* Estimates */}
            <div>
              <h3 className="text-lg font-medium">Estimates</h3>
              {projectBlock.estimates.length === 0 ? (
                <p className="text-gray-500">No estimate created</p>
              ) : (
                projectBlock.estimates.map((estimate) => (
                  <div key={estimate._id} className="border rounded p-2 my-2">
                    <p>Estimate ID: {estimate._id}</p>
                    <p>Client: {estimate.clientId?.name || 'N/A'}</p>

                    {/* Expenses */}
                    <h4 className="font-semibold mt-2">Expenses</h4>
                    {projectBlock.expenses.length > 0 ? (
                      <table className="w-full text-sm border">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-1">Expense Number</th>
                            <th className="border p-1">Date</th>
                            <th className="border p-1">Vendor</th>
                            
                            <th className="border p-1">Reference</th>
                            <th className="border p-1">Company</th>
                            <th className="border p-1">Amount</th>

                          </tr>
                        </thead>
                        <tbody>
                          {projectBlock.expenses.map((exp) => (
                            <tr key={exp._id}>
                              <td className="border p-1">{exp.expenseNumber}</td>
                              <td className="border p-1">{exp.date}</td>
                              <td className="border p-1">{exp.vendorName}</td>
                              <td className="border p-1">{exp.reference}</td>
                              <td className="border p-1">{exp.company}</td>
                              <td className="border p-1">{exp.amount}</td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-gray-500">No expenses</p>
                    )}

                    {/* Wages */}
                    <h4 className="font-semibold mt-2">Wages</h4>
                    {projectBlock.wages.length > 0 ? (
                      <table className="w-full text-sm border">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-1">Wage Number</th>
                            <th className="border p-1">Date</th>
                            <th className="border p-1">Vendor</th>
                            
                            <th className="border p-1">Reference</th>
                            <th className="border p-1">Company</th>
                            <th className="border p-1">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectBlock.wages.map((w) => (
                            <tr key={w._id}>
                              <td className="border p-1">{w.wageNumber}</td>
                              <td className="border p-1">{w.date}</td>
                              <td className="border p-1">{w.vendorName}</td>
                              <td className="border p-1">{w.reference}</td>
                              <td className="border p-1">{w.company}</td>
                              <td className="border p-1">{w.amount}</td>
                              
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-gray-500">No wages</p>
                    )}

                    {/* Purchase Orders */}
                    <h4 className="font-semibold mt-2">Purchase Orders</h4>
                    {projectBlock.purchaseOrders.length > 0 ? (
                      <table className="w-full text-sm border">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-1">PO Number</th>
                            <th className="border p-1">Date</th>
                            <th className="border p-1">Vendor</th>
                            
                            <th className="border p-1">Reference</th>
                            <th className="border p-1">Company</th>
                            <th className="border p-1">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectBlock.purchaseOrders.map((po) => (
                            <tr key={po._id}>
                              <td className="border p-1">{po.poNumber}</td>
                              <td className="border p-1">{po.date}</td>
                              <td className="border p-1">{po.vendorName}</td>
                              <td className="border p-1">{po.reference}</td>
                              <td className="border p-1">{po.company}</td>
                              <td className="border p-1">{po.amount}</td>
                              
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-gray-500">No purchase orders</p>
                    )}

                    {/* Payslips */}
                    <h4 className="font-semibold mt-2">Payslips</h4>
                    {projectBlock.payslips.length > 0 ? (
                      <table className="w-full text-sm border">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-1">Employee</th>
                            <th className="border p-1">Amount</th>
                            <th className="border p-1">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectBlock.payslips.map((ps) => (
                            <tr key={ps._id}>
                              <td className="border p-1">{ps.employeeName}</td>
                              <td className="border p-1">{ps.amount}</td>
                              <td className="border p-1">{ps.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-gray-500">No payslips</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
