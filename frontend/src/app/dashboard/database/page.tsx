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
import Iconify from "@/components/custom/ui/Iconify";
import { Input } from "@/components/custom/ui/Input";

function Database() {



  return (
    <Tabs defaultValue="students">
      <div className="flex flex-row w-full h-fit gap-[10px] p-[15px] items-center">

        <div className="flex flex-row w-fit h-fit p-[15px]">
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


        <div className="flex flex-row w-full h-fit p-[10px]">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search Student..."
              className="pr-10"
            />
            <Iconify icon="mdi:magnify" className="absolute right-3 top-1/2 -translate-y-1/2 text-white" size={24} />
          </div>
        </div>

        <Button
          variant="desktop_content"
          font="desktop">
          <Iconify icon="gridicons:add" size={24} />
          Add Student
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
            {studentsData.map((student) => (
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
                    <Button
                      variant={"desktop_content"}
                    >
                      <Iconify
                        icon="material-symbols:edit-outline"
                        size={20}
                      />
                    </Button>
                    <Button
                      variant={"desktop_content"}
                    >
                      <Iconify
                        icon="material-symbols:delete-outline"
                        size={20}
                      />
                    </Button>
                  </div>

                </TableCell>
              </TableRow>
            ))}
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
              <TableHead>Total Berhalangan (Bulan ini)</TableHead>
              <TableHead>Total Suci (Bulan ini)</TableHead>
              <TableHead>Presentasi Kehadiran (Bulan ini)</TableHead>
              <TableHead>Angkatan</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classesData.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.wali}</TableCell>
                <TableCell>{student.total_siswi}</TableCell>
                <TableCell>{student.total_berhalangan}</TableCell>
                <TableCell>{student.total_suci}</TableCell>
                <TableCell>{student.attendance}</TableCell>
                <TableCell>{student.angkatan}</TableCell>
                <TableCell>

                  <div className="flex flex-row w-full h-fit gap-[10px] justify-center">
                    <Button
                      variant={"desktop_content"}
                    >
                      <Iconify
                        icon="material-symbols:edit-outline"
                        size={20}
                      />
                    </Button>
                    <Button
                      variant={"desktop_content"}
                    >
                      <Iconify
                        icon="ic:baseline-qr-code"
                        size={20}
                      />
                    </Button>
                    <Button
                      variant={"desktop_content"}
                    >
                      <Iconify
                        icon="material-symbols:delete-outline"
                        size={20}
                      />
                    </Button>
                  </div>

                </TableCell>
              </TableRow>
            ))}
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
            {usersData.map((users) => (
              <TableRow key={users.id}>
                <TableCell>{users.id}</TableCell>
                <TableCell>{users.nama_lengkap}</TableCell>
                <TableCell>{users.username}</TableCell>
                <TableCell>{users.password}</TableCell>
                <TableCell>{users.role}</TableCell>
                <TableCell>{users.last_login}</TableCell>
                <TableCell>

                  <div className="flex flex-row w-full h-fit gap-[10px] justify-center">
                    <Button
                      variant={"desktop_content"}
                    >
                      <Iconify
                        icon="material-symbols:edit-outline"
                        size={20}
                      />
                    </Button>
                    <Button
                      variant={"desktop_content"}
                    >
                      <Iconify
                        icon="material-symbols:delete-outline"
                        size={20}
                      />
                    </Button>
                  </div>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>

    </Tabs >
  );
}

export default Database