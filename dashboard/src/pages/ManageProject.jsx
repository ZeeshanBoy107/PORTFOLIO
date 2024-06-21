import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { resetApplicationSlice } from '@/store/slices/application.slice';
import { clearAllProjectError, clearAllProjectMessage, deleteProject, getAllProjects } from '@/store/slices/project.slice';
import { Eye, Pen, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function ManageProject() {
  const dispatch = useDispatch();

  const { projects, loading, error, message } = useSelector((state) => state.project);

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectError());
    }

    if (message) {
      toast.success(message);
      dispatch(clearAllProjectMessage());
      dispatch(resetApplicationSlice());
      dispatch(getAllProjects());
    }
  }, [loading, error, dispatch, message]);

  return (
    <>
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="px-7 flex items-center justify-between flex-row">
              <CardTitle>Manage Your Projects</CardTitle>
              <Link to={"/"}>
                <Button>Return to Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Stack
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Deployed
                    </TableHead>
                    <TableHead className="md:table-cell">View</TableHead>
                    <TableHead className="md:table-cell">Update</TableHead>
                    <TableHead className="text-right">Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects?.length > 0 ? (
                    projects.map((element) => {
                      return (
                        <TableRow className="bg-accent" key={element._id}>
                          <TableCell>
                            <div>
                              <img src={element?.projectBanner?.url} alt={element.title} className='w-16 h-16'/>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold">{element.title}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="font-semibold">{element.stack}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="font-semibold">
                              {element.deployed}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Link to={`/view/project/${element._id}`}>
                              <Button><Eye /></Button>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link to={`/update/project/${element._id}`}>
                              <Button><Pen /></Button>
                            </Link>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() => {
                                handleDeleteProject(element._id);
                              }}
                            >
                              <Trash2 />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell className="text-3xl overflow-y-hidden">
                        You have no added Projects.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default ManageProject