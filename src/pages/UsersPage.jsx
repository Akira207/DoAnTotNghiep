import { useEffect, useState } from "react";

import Sidebar from "../components/layouts/SideBar";
import MobileHeader from "../components/layouts/MobileHeader";

import UsersHeader from "../features/User/UsersHeader";
import UsersStats from "../features/User/UsersStats";
import UsersTable from "../features/User/UsersTable";
import AddUserForm from "../features/user/AddUserForm";
import UserDetailModal from "../features/user/UserDetailModal";

import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";

export default function UsersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setError(null);
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch users error:", err);
      setError(err.message || "Failed to fetch users");
      setUsers([]);
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
        await updateUser(editUser._id, data);
      } else {
        await createUser(data);
      }

      setFormOpen(false);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Save user error:", err);
      setError(err.message || "Failed to save user");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá user này?")) return;

    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message || "Failed to delete user");
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