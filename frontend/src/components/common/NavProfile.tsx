
import {

    Dropdown,
  
    theme,
  } from "flowbite-react";
import { twMerge } from "tailwind-merge";
import { useUser } from "../../auth";

import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { logout } from '../../lib/allauth'
export default function NavProfile(){
    const user = useUser()

    const [response, setResponse] = useState({ fetching: false, content: null })

    function submit () {
      setResponse({ ...response, fetching: true })
      logout().then((content) => {
        setResponse((r) => { return { ...r, content } })
      }).catch((e) => {
        console.error(e)
        window.alert(e)
      }).then(() => {
        setResponse((r) => { return { ...r, fetching: false } })
      })
    }
    if (response.content) {
      return <Navigate to='/' />
    }

    return (
        <Dropdown
              inline
              label={
                <>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt=""
                  />
                </>
              }
              placement="bottom"
              theme={{
                arrowIcon: "hidden",
                floating: {
                  base: twMerge(theme.dropdown.floating.base, "w-60"),
                },
                inlineWrapper: twMerge(
                  theme.dropdown.inlineWrapper,
                  "pl-2 text-gray-600 dark:text-gray-400",
                ),
              }}
            >
              <div className="px-4 py-3">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  {user.display}
                </span>
                <span className="block truncate text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              <Dropdown.Divider />
              <Dropdown.Item className="text-gray-500 dark:text-gray-400">
                <Link to={`/profile/${user.display}`}>My profile</Link>
              </Dropdown.Item>
              <Dropdown.Item className="text-gray-500 dark:text-gray-400">
                <Link to="/account/account-details">Account settings</Link>
                
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className="text-gray-500 dark:text-gray-400">
                <svg
                  className="mr-2 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                </svg>
                My links
              </Dropdown.Item>
              <Dropdown.Item className="text-gray-500 dark:text-gray-400">
                <svg
                  className="mr-2 h-4 w-4 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z" />{" "}
                  <path d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z" />{" "}
                  <path d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z" />{" "}
                </svg>
                Collections
              </Dropdown.Item>
              <Dropdown.Item className="text-gray-500 dark:text-gray-400">
                <div className="flex w-full items-center justify-between">
                  <span className="flex items-center">
                    <svg
                      className="mr-2 h-4 w-4 text-primary-600 dark:text-primary-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m7.164 3.805-4.475.38L.327 6.546a1.114 1.114 0 0 0 .63 1.89l3.2.375 3.007-5.006ZM11.092 15.9l.472 3.14a1.114 1.114 0 0 0 1.89.63l2.36-2.362.38-4.475-5.102 3.067Zm8.617-14.283A1.613 1.613 0 0 0 18.383.291c-1.913-.33-5.811-.736-7.556 1.01-1.98 1.98-6.172 9.491-7.477 11.869a1.1 1.1 0 0 0 .193 1.316l.986.985.985.986a1.1 1.1 0 0 0 1.316.193c2.378-1.3 9.889-5.5 11.869-7.477 1.746-1.745 1.34-5.643 1.01-7.556Zm-3.873 6.268a2.63 2.63 0 1 1-3.72-3.72 2.63 2.63 0 0 1 3.72 3.72Z" />
                    </svg>
                    Pro version
                  </span>
                  <svg
                    className="h-2.5 w-2.5 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => submit()} className="text-gray-500 dark:text-gray-400">
                Sign out
              </Dropdown.Item>
            </Dropdown>
    )
}