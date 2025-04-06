import Container from '@/components/layouts/main-layout/container';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useBlockUserMutation,
  useChangeRoleMutation,
  useUnblockUserMutation,
  useUsersQuery,
} from '@/redux/features/users/usersApi';
import { IUserDetails } from '@/types/common';
import { MoreHorizontalIcon } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ChangeRoleDialog from './change-role-dialog';

const ManageUsers = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [isChangeRoleDialogOpen, setIsChangeRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUserDetails | null>(null);

  const {
    data: allUsers,
    isLoading,
    isFetching,
  } = useUsersQuery({ page, limit });
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
  const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();
  const [changeRole, { isLoading: isChangingRole }] = useChangeRoleMutation();

  const totalPages = allUsers?.meta?.totalPages || 1;

  const handleBlock = (userId: string) => {
    if (isBlocking) return;

    toast.loading('Blocking user...', { id: 'blockUser' });

    blockUser({ userId })
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success('User blocked successfully', { id: 'blockUser' });
        }
      })
      .catch(() => {
        toast.error('Failed to block user', { id: 'blockUser' });
      });
  };

  const handleUnblock = (userId: string) => {
    if (isUnblocking) return;

    toast.loading('Unlocking user...', { id: 'unblockUser' });

    unblockUser({ userId })
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success('User unblocked successfully', { id: 'unblockUser' });
        }
      })
      .catch(() => {
        toast.error('Failed to unblock user', { id: 'unblockUser' });
      });
  };

  const handleChangeRole = (userId: string, role: 'admin' | 'customer') => {
    if (isChangingRole) return;

    toast.loading('Changing user role...', { id: 'changeRole' });

    console.log({ userId, role });

    changeRole({ userId, role })
      .unwrap()
      .then((res) => {
        if (res) {
          toast.success('User role changed successfully', { id: 'changeRole' });
          setIsChangeRoleDialogOpen(false);
          setSelectedUser(null);
        }
      })
      .catch(() => {
        toast.error('Failed to change user role', { id: 'changeRole' });
      });
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Manage Users
      </h2>

      {isLoading ? (
        <Container className="py-28 text-center">
          <p className="text-gray-500 text-lg">Loading users...</p>
        </Container>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {allUsers?.data?.map((user, index: number) => (
                <TableRow key={user?._id}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    {user?.status === 'active' ? (
                      <span className="text-green-600">Active</span>
                    ) : (
                      <span className="text-red-600">Blocked</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {user?.status === 'active' ? (
                          <DropdownMenuItem
                            disabled={isBlocking}
                            onClick={() => handleBlock(user._id)}
                          >
                            Block User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleUnblock(user._id)}
                          >
                            Unblock User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          disabled={isChangingRole}
                          onClick={() => {
                            setIsChangeRoleDialogOpen(true);
                            setSelectedUser(user);
                          }}
                        >
                          Change Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={`${
                  page === 1 || isFetching
                    ? 'pointer-events-none opacity-50'
                    : ''
                }`}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                  className={isFetching ? 'pointer-events-none opacity-50' : ''}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 5 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={`${
                  page === totalPages || isFetching
                    ? 'pointer-events-none opacity-50'
                    : ''
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Change Role Dialog */}
      {isChangeRoleDialogOpen && (
        <ChangeRoleDialog
          user={selectedUser}
          onClose={(setState: boolean) => {
            setIsChangeRoleDialogOpen(setState);
            setSelectedUser(null);
          }}
          handleChangeRole={handleChangeRole}
        />
      )}
    </>
  );
};

export default ManageUsers;
