import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ExternalLink, Facebook, Github, Instagram, Linkedin, Twitter, X, Youtube } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

function Hero() {
  const [user, setUser] = useState({});

  useEffect ( () => {
    const getMyProfile = async () => {
      const { data } = await axios.get("http://localhost:4000/api/v1/user/portfolio", 
        {withCredentials: true}
      )
      setUser(data.user);
    }
    getMyProfile();
  }, [])

  const typewriterWords = user.fullName
    ? [
        ` ${user.fullName.toUpperCase()}`,
        "A FULLSTACK DEVELOPER",
        "A FREELANCER",
      ]
    : ["A FULLSTACK DEVELOPER", "A FREELANCER"];
  return (
    <div className="w-full">
      {/* <div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 rounded-full h-2 w-2"></span>
        <p>Online</p>
      </div> */}
      <h1 className="overflow-x-hidden text-[0.95rem] md:text-[3rem] lg:text-[4rem] tracking-[2px] mb-4">
        HEY, I'M
        <span className="text-tubeLight-effect tracking-[10px]">
          <Typewriter
            words={typewriterWords}
            loop={1000}
            cursor
            typeSpeed={90}
            deleteSpeed={90}
            delaySpeed={150}
          />
        </span>
      </h1>
      <div className="w-fit px-3 py-2 rounded-[20px] bg-slate-50 flex gap-5 items-center md:mt-8 lg:mt-10">
        <Link to={user?.linkedinURL} target="_blank">
          <Linkedin className="text-black w-7 h-7" />
        </Link>
        <Link to={user?.xURL} target="_blank">
          <Twitter className="text-black w-7 h-7" />
        </Link>
        <Link to={user?.instagramURL} target="_blank">
          <Instagram className="text-black w-7 h-7" />
        </Link>
        <Link to={user?.facebookURL} target="_blank">
          <Facebook className="text-black w-7 h-7" />
        </Link>
      </div>
      <div className="mt-4 md:m5-7 lg:mt-10 flex gap-3">
        <Link to={user?.githubURL} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <Github />
            </span>
            <span>Github</span>
          </Button>
        </Link>
        <Link to={user?.resume?.url} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row">
            <span>
              <ExternalLink />
            </span>
            <span>Resume</span>
          </Button>
        </Link>
      </div>
      <p className='mt-8 sm:text-l text-xl tracking-[2px]'>{user?.aboutMe}</p>
      <hr className='my-8 md:my-10'/>
    </div>
  );
}

export default Hero