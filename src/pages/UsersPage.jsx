import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";

import UsersHeader from "../features/User/UsersHeader";
import UsersStats from "../features/User/UsersStats";
import UsersTable from "../features/User/UsersTable";
import AddUserForm from "../features/user/AddUserForm";
import UserDetailModal from "../features/user/UserDetailModal";

export default function UsersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // FORM
  const [formOpen, setFormOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  // VIEW MODAL
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen((p) => !p);

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/users");

      setUsers(res.data.data || []);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = async (data) => {
    try {
      if (editUser) {
        await axios.put(
          `http://localhost:5000/api/users/${editUser._id}`,
          data
        );
      } else {
        await axios.post("http://localhost:5000/api/users", data);
      }

      setFormOpen(false);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Save user error:", err);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá user này?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen overflow-x-hidden">

      {/* overlay mobile */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/50 z-[50] md:hidden
        ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MobileHeader onOpenSidebar={toggleSidebar} />

      <main className="lg:ml-[280px] p-4 lg:p-8 space-y-8">

        {/* HEADER */}
        <UsersHeader
          onAdd={() => {
            setEditUser(null);
            setFormOpen(true);
          }}
        />

        {/* STATS */}
        <UsersStats />

        {/* TABLE */}
        <UsersTable
          users={users}
          loading={loading}
          onEdit={(user) => {
            setEditUser(user);
            setFormOpen(true);
          }}
          onDelete={handleDelete}
          onView={(user) => {
            setSelectedUser(user);
            setViewOpen(true);
          }}
        />

      </main>

      {/* FORM (ADD / EDIT) */}
      <AddUserForm
        open={formOpen}
        initialData={editUser}
        onClose={() => {
          setFormOpen(false);
          setEditUser(null);
        }}
        onSubmit={handleSubmit}
      />

      {/* VIEW MODAL */}
      <UserDetailModal
        open={viewOpen}
        user={selectedUser}
        onClose={() => {
          setViewOpen(false);
          setSelectedUser(null);
        }}
      />

    </div>
  );
}