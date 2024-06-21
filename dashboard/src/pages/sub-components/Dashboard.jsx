import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { clearAllApplicationError, clearAllApplicationMessage, deleteApplication, getAllApplications, resetApplicationSlice } from '@/store/slices/application.slice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import SpecialLoadingButton from './SpecialLoadingButton'
import { Trash2 } from 'lucide-react'

function Dashboard() {
  
  const { user } = useSelector((state) => state.user)
  const { projects } = useSelector((state) => state.project)
  const { skills } = useSelector((state) => state.skill)
  const { applications, error, loading, message } = useSelector((state) => state.application)
  const { timeline } = useSelector((state) => state.timeline)

  const dispatch = useDispatch();

  const [appId, setAppId] = useState("");

  const handleDeleteSoftWareApp = (id) => {
    setAppId(id);
    dispatch(deleteApplication(id));
  }

  useEffect( () => {
    if(error) {
      toast.error(error);
      dispatch(clearAllApplicationError());
    }

    if(message) {
      toast.success(message);
      dispatch(clearAllApplicationMessage());
      dispatch(resetApplicationSlice());
      dispatch(getAllApplications());
      
    }
  }, [dispatch, error, message, loading])

  return (
    <>
      <div className="flex flex-col sm:gap-2 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-8">
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    {user?.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to={user?.portfolioURL} target='_blank'>
                    <Button>Visit Portfolio</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Projects</CardTitle>
                    <Link to={"/manage/projects"}>
                      <Button>Manage Projects</Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Deployed
                          </TableHead>
                          <TableHead className="md:table-cell text-right">
                            Update
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects?.length > 0 ? (
                          projects.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell>
                                  <div className="font-semibold">
                                    {element.title}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <div className="font-semibold">
                                    {element.stack}
                                  </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <div className="font-semibold">
                                    {element.deployed}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Link to={`/update/project/${element._id}`}>
                                    <Button>Update</Button>
                                  </Link>
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
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Skills</CardTitle>
                    <Link to={"/manage/skills"}>
                      <Button>Manage Skills</Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-2">
                    {skills?.length > 0 ? (
                      skills.map((element) => {
                        return (
                          <Card key={element._id}>
                            <CardHeader>{element.title}</CardHeader>
                            <CardFooter>
                              <Progress value={element.proficiency} />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-3xl overflow-y-hidden">
                        You have no added Skills.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Software Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="md:table-cell">Icon</TableHead>
                          <TableHead className="md:table-cell text-end">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {applications?.length > 0 ? (
                          applications.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell>{element.name}</TableCell>
                                <TableCell>
                                  <img
                                    src={element.image?.url}
                                    alt={element.name}
                                    className="w-7 h-7"
                                  />
                                </TableCell>
                                <TableCell className="text-end">
                                  {loading && appId === element._id ? (
                                    <SpecialLoadingButton
                                      content={"Deleting"}
                                    />
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleDeleteSoftWareApp(element._id)
                                      }
                                    >
                                      <Trash2 />
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You dont have any Software Apllications Added.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Link to={"/manage/timelines"}>
                      <Button>Manage Timelines</Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead className="text-right">To</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline?.length > 0 ? (
                          timeline.map((element) => {
                            return (
                              <TableRow className="bg-accent" key={element._id}>
                                <TableCell className="font-medium">
                                  {element.title}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {element.timeline.from}
                                </TableCell>
                                <TableCell className="md:table-cell text-right">
                                  {" "}
                                  {element.timeline.to
                                    ? `${element.timeline.to}`
                                    : "Present"}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-3xl over-y-hidden">
                              There is no TimeLine Added.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard