import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProjectView() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [deployed, setDeployed] = useState("");
  const [stack, setStack] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(`https://portfolio-ip3n.onrender.com/api/v1/project/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectBanner(res.data.project.projectBanner?.url);
          setProjectLink(res.data.project.projectLink);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const descriptionInListFormat = description.split(". ");
  const technologiesInListFormat = technologies.split(", ");

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <div className="w-[100%] px-5 md:w-[1000px]">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl text-bold mb-4">{title}</h1>
                  <img
                    src={projectBanner}
                    alt={title}
                    className="w-full h-auto"
                  />
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Description:</p>
                  <ul className="list-disc">
                    {descriptionInListFormat.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Technologies:</p>
                  <ul className="list-disc">
                    {technologiesInListFormat.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Stack:</p>
                  <p>{stack}</p>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Deployed:</p>
                  <p>{deployed}</p>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Github Repo Link:</p>
                  <Link
                    to={gitRepoLink}
                    target="_blank"
                    className="text-sky-700"
                  >
                    {gitRepoLink}
                  </Link>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2">Project Link:</p>
                  <Link
                    to={projectLink}
                    target="_blank"
                    className="text-sky-700"
                  >
                    {projectLink}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectView;
