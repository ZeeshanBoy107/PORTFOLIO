import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { toast } from 'react-toastify';
import { clearAllTimelineError, clearAllTimelineMessage, deleteTimeline, getAllTimeline, resetTimelineSlice } from '@/store/slices/timeline.slice';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';

function ManageTimeline() {
  const {timeline, error, message} = useSelector(state => state.timeline)
  const dispatch = useDispatch();
  
  const handleDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id))
  }

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch(clearAllTimelineError());
    }
    if(message) {
      toast.success(message);
      dispatch(clearAllTimelineMessage());
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline())
    }
  }, [dispatch, error, message])
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle className="text-xl">Manage Your Timeline</CardTitle>
                <Link to={"/"}>
                  <Button>Return to Dashboard</Button>
                </Link>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead className="text-right">Action</TableHead>
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
                              {element.description}
                            </TableCell>
                            <TableCell className="md:table-cell">
                              {element.timeline.from}
                            </TableCell>
                            <TableCell className="md:table-cell">
                              {" "}
                              {element.timeline.to
                                ? `${element.timeline.to}`
                                : "Present"}
                            </TableCell>
                            <TableCell className="flex justify-end">
                              <Button onClick={() => {handleDeleteTimeline(element._id)}}>
                                <Trash2 />
                              </Button>
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
    </>
  );
}

export default ManageTimeline