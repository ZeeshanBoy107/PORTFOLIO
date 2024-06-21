import { Card } from '@/components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function MyApps() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const getAllApps = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/softwareapplication/getall",
        { withCredentials: true }
      );
      setApps(data.softwareApps);
    };
    getAllApps();
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1
        className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
      lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit"
      >
        MY APPS
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {apps?.map((element) => {
          return (
            <Card
              className="h-fit p-7 flex flex-col justify-center items-center gap-3"
              key={element._id}
            >
              <img
                src={element?.image?.url}
                alt="skill"
                className="h-12 sm:h-24 w-auto"
              />
              <p className="text-muted-foreground text-center">
                {element.name}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default MyApps