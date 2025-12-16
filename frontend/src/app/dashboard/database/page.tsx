"use client"

// Shadcn
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Custom
import { Button } from "@/components/custom/ui/buttons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/custom/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/custom/ui/table"
import { studentsData, classesData, usersData } from "@/lib/dummyData";
import { Input } from "@/components/custom/ui/Input";
import Iconify from "@/components/custom/mobile/ui/Iconify";
import { useState } from "react";
import AddStudentModal from "@/components/custom/AddStudentModal";
import AddClassModal from "@/components/custom/AddClassModal";
import AddUserModal from "@/components/custom/AddUserModal";


function Database() {
  const [keyword, setKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("students");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<"student" | "class" | "user" | null>(null);

  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setKeyword("");
  };

  const filteredStudents = studentsData.filter((student) => {
    return student.name.toLowerCase().includes(keyword.toLowerCase()) ||
      student.nis.includes(keyword);
  });

  const filteredClasses = classesData.filter((kelas) => {
    return (
      kelas.name.toLowerCase().includes(keyword.toLowerCase()) ||
      kelas.wali.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  const filteredUsers = usersData.filter((user) => {
    return (
      user.nama_lengkap.toLowerCase().includes(keyword.toLowerCase()) ||
      user.username.toLowerCase().includes(keyword.toLowerCase()) ||
      user.role.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  const handleAddClick = () => {
    setEditingData(null);

    if (activeTab === "students") {
      setIsAddStudentOpen(true);
    } else if (activeTab === "classes") {
      setIsAddClassOpen(true);
    } else if (activeTab === "users") {
      setIsAddUserOpen(true);
    }
  };

  const handleEditStudentClick = (student: any) => {
    setEditingData(student);
    setIsAddStudentOpen(true);
  };

  const handleEditClassClick = (kelasData: any) => {
    setEditingData(kelasData);
    setIsAddClassOpen(true);
  };

  const handleEditUserClick = (userData: any) => {
    setEditingData(userData);
    setIsAddUserOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDeleteType("student");
    setIsDeleteOpen(true);
  };

  const handleDeleteClassClick = (id: string) => {
    setDeleteId(id);
    setDeleteType("class");
    setIsDeleteOpen(true);
  };

  const handleDeleteUserClick = (id: string) => {
    setDeleteId(id);
    setDeleteType("user");
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (deleteType === "student") {
      console.log("MENGHAPUS SISWA ID:", deleteId);
    } else if (deleteType === "class") {
      console.log("MENGHAPUS KELAS ID:", deleteId);
    } else if (deleteType === "user") {
      console.log("MENGHAPUS USER ID:", deleteId);
    }
    setIsDeleteOpen(false);
    setDeleteId(null);
    setDeleteType(null);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      {/* Header Konten Desktop */}
      <div className="flex w-full h-fit gap-[20px] pt-[20px] pb-[20px] items-center">
        {/* Table Tabs */}
        <div className="flex w-fit h-fit">
          <TabsList>
            <TabsTrigger value="students">
              <Iconify icon="mdi:account" size={24} />
              Students</TabsTrigger>
            <TabsTrigger value="classes">
              <Iconify icon="ic:baseline-class" size={24} />
              Classes</TabsTrigger>
            <TabsTrigger value="users">
              <Iconify icon="lucide:user-cog" size={24} />
              Users</TabsTrigger>
          </TabsList>
        </div>

        {/* Searchbar Table */}
        <div className="flex w-full h-fit">
          <div className="relative w-full max-w-[400px]">
            <Input
              type="text"
              placeholder={activeTab === "students" ? "Search Student (Name/NIS)..." : activeTab === "classes" ? "Search Class (Name/Wali)..." : "Search User (Name/Role)..."}
              className="pr-[40px]"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword.length > 0 ? (
              <button onClick={() => setKeyword("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white flex items-center justify-center">
                <Iconify icon="material-symbols:close" size={24} />
              </button>
            ) : (
              <Iconify icon="material-symbols:search" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70" size={24}
              />
            )}
          </div>
        </div>

        {/* Tambahkah Siswi */}
        <Button onClick={handleAddClick}>
          <Iconify icon="gridicons:add" size={24} />
          {activeTab === "students"
            ? "Add Student"
            : activeTab === "classes"
              ? "Add Class"
              : "Add User"
          }
        </Button>

      </div>

      {/* Tab Students */}
      <TabsContent value="students">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>NIS</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>QR Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.nis}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>{student.qrCode}</TableCell>
                  <TableCell>{student.status}</TableCell>
                  <TableCell>{student.notes}</TableCell>
                  <TableCell>
                    <div className="flex flex-row w-full h-fit gap-[10px] justify-center">
                      <Button variant="outline" size="icon" onClick={() => handleEditStudentClick(student)}>
                        <Iconify
                          icon="material-symbols:edit-outline"
                          size={20}
                        />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteClick(student.id)}>
                        <Iconify icon="material-symbols:delete-outline" size={20} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TabsContent>


      {/* Tab Classes */}
      <TabsContent value="classes">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama Kelas</TableHead>
              <TableHead>Wali Kelas</TableHead>
              <TableHead>Total Siswi</TableHead>
              <TableHead>Total Berhalangan</TableHead>
              <TableHead>Total Suci</TableHead>
              <TableHead>Persentasi Kehadiran</TableHead>
              <TableHead>Angkatan</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((kelas) => (
                <TableRow key={kelas.id}>
                  <TableCell>{kelas.id}</TableCell>
                  <TableCell>{kelas.name}</TableCell>
                  <TableCell>{kelas.wali}</TableCell>
                  <TableCell>{kelas.total_siswi}</TableCell>
                  <TableCell>{kelas.total_berhalangan}</TableCell>
                  <TableCell>{kelas.total_suci}</TableCell>
                  <TableCell>{kelas.attendance}</TableCell>
                  <TableCell>{kelas.angkatan}</TableCell>
                  <TableCell>

                    <div className="flex flex-row w-full h-fit gap-[10px] justify-center">
                      <Button
                        variant="outline" size="icon" onClick={() => handleEditClassClick(kelas)}
                      >
                        <Iconify
                          icon="material-symbols:edit-outline"
                          size={20}
                        />
                      </Button>
                      <Button
                        variant="outline" size="icon"
                      >
                        <Iconify
                          icon="ic:baseline-qr-code"
                          size={20}
                        />
                      </Button>
                      <Button
                        variant="outline" size="icon" onClick={() => handleDeleteClassClick(kelas.id)}
                      >
                        <Iconify
                          icon="material-symbols:delete-outline"
                          size={20}
                        />
                      </Button>
                    </div>

                  </TableCell>
                </TableRow>
              ))) : (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No classes found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TabsContent>


      {/* Tab Users */}
      <TabsContent value="users">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama Lengkap</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Login Terakhir</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.nama_lengkap}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.last_login}</TableCell>
                  <TableCell>

                    <div className="flex flex-row w-full h-fit gap-[10px] justify-center">
                      <Button
                        variant="outline" size="icon" onClick={() => handleEditUserClick(user)}
                      >
                        <Iconify
                          icon="material-symbols:edit-outline"
                          size={20}
                        />
                      </Button>
                      <Button
                        variant="outline" size="icon" onClick={() => handleDeleteUserClick(user.id)}
                      >
                        <Iconify
                          icon="material-symbols:delete-outline"
                          size={20}
                        />
                      </Button>
                    </div>

                  </TableCell>
                </TableRow>
              ))) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TabsContent>

      {/* Pop-up add sama edit */}
      <AddStudentModal isOpen={isAddStudentOpen} onClose={() => setIsAddStudentOpen(false)} initialData={editingData} />
      <AddClassModal isOpen={isAddClassOpen} onClose={() => setIsAddClassOpen(false)} initialData={editingData} />
      <AddUserModal isOpen={isAddUserOpen} onClose={() => setIsAddUserOpen(false)} initialData={editingData} />

      {/* Pop-up konfirmasi hapus */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-[#151419] border border-[#3F3F3F]">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60 mb-2">
              Are you sure you want to remove this {deleteType || "item"} from the database?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 px-4 py-2 text-[15px]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="h-11 px-4 py-2 text-[15px] bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </Tabs >
  );
}

export default Database;
