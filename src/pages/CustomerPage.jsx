import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";
import CustomerHeader from "../features/customer/CustomerHeader";
import CustomerStats from "../features/customer/CustomerStats";
import CustomerTable from "../features/customer/CustomerTable";
import CustomerActivity from "../features/customer/CustomerActivity";
import CustomerAnalysis from "../features/customer/CustomerAnalysis";
import AddCustomerForm from "../features/customer/AddCustomerForm";
import PaginationTable from "../components/common/PaginationTable";

import { getCustomers } from "../services/customerService";

export default function CustomerPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  // search + debounce
  const [keyword, setKeyword] = useState("");
  const debounced = useDebounce(keyword, 400);

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // fetch data
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // filter
  const filtered = customers.filter((c) =>
    `${c.name} ${c.phone} ${c.address}`
      .toLowerCase()
      .includes(debounced.toLowerCase()),
  );

  // pagination logic
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="bg-background text-on-background font-body min-h-screen overflow-x-hidden">
      {/* Overlay */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/50 z-[50] md:hidden transition ${
          isSidebarOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MobileHeader onOpenSidebar={toggleSidebar} />

      <main className="p-4 md:p-8 lg:ml-[280px] space-y-6">
        <CustomerHeader
          onSearch={setKeyword}
          onOpenForm={() => setFormOpen(true)}
        />

        <CustomerStats customers={customers} />

        <div className="space-y-4">
          <div className="flex flex-col">
            <CustomerTable
              customers={paginated}
            />
            <PaginationTable
              currentPage={page}
              totalPages={totalPages}
              onChangePage={setPage}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          <CustomerActivity />
          <CustomerAnalysis />
        </div>
        {formOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
            <AddCustomerForm
              onClose={() => setFormOpen(false)}
              onSuccess={() => {
                fetchCustomers();
                setFormOpen(false);
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
