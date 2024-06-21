import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs } from '@/components/ui/tabs';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { clearAllSkillError, clearAllSkillMessage, deleteSkill, getAllSkills, resetSkillSlice, updateSkill } from '@/store/slices/skills.slice';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function ManageSkills() {
  const { skills, error, message, loading } = useSelector((state) => state.skill);

  const dispatch = useDispatch();

  const [newProficiency,  setNewProficiency] = useState(1);

  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency)
  };

  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
  }

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  }

  useEffect(() => {
    if(error) {
      toast.error(error); 
      dispatch(clearAllSkillError());
    }

    if(message) {
      toast.success(message);
      dispatch(clearAllSkillMessage());
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  },[loading, error, dispatch, message])

  return (
    <>
      <div className='flex min-h-screen w-full flex-col bg-muted/40'>
        <Tabs>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Skills</CardTitle>
              <Link to={"/"}>
              <Button>
                Return to Dashboard
              </Button>
              </Link>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {
                skills?.length > 0 ? (
                  skills.map(element => {
                    return (
                      <Card key={element._id}>
                        <CardHeader className="text-xl font-bold items-center justify-between flex-row">
                          {element.title}
                          <Button onClick={() => {handleDeleteSkill(element._id)}}><Trash2 /></Button>
                        </CardHeader>
                        <CardFooter>
                          <Label className="text-xl mr-2">Proficiency</Label>
                          <Input type="number"
                          min={0} max={100}
                          defaultValue={element.proficiency} onChange={(e) => {handleInputChange(e.target.value)}}
                          onBlur={() => {
                            handleUpdateSkill(element._id)
                          }} 
                          />
                        </CardFooter>
                      </Card>
                    );
                  })
                ) : <CardTitle className="text-3xl overflow-y-hidden">You have no Skills added</CardTitle>
              }
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </>
  )
}

export default ManageSkills