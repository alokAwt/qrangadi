'use client'
import React from 'react'
import {Badge,Avatar,Button} from "@nextui-org/react";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, User} from "@nextui-org/react";




const ProfileNav = () => {
  return (
    <nav className='h-12 w-full flex p-2 lg:p-6 mt-2 items-center justify-between sticky top-0  bg-white'>
        <div>
          <p className='text-xs text-gray-500 font-medium'> Hello, Santosh </p>
          <p className='md:text-md text-xs font-semibold '>Let’s create QR Codes.</p>
        </div>
        <div className='flex items-center gap-2 p-1 '>
        <Badge
        isOneChar
        content={'5'}
        color="danger"
        shape="circle"
        placement="top-right"
      >
       <span className='h-8 w-8 ring-1 rounded-md flex justify-center items-center'> <IoNotificationsOutline size={24}/></span>
      </Badge>

      <div className='flex items-center gap-2'>
      <Avatar className='h-8 w-8 m-1' isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <Dropdown
                showArrow
                radius="sm"
                classNames={{
                  base: "before:bg-default-200", // change arrow background
                  content: "p-0 border-small border-divider bg-background",
                }}
              >
                <DropdownTrigger>
                 <Button className='w-12'  variant='light'>Emma <span><MdKeyboardArrowDown/></span></Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Custom item styles"
                  // disabledKeys={["profile"]}
                  className="p-3"
                  itemClasses={{
                    base: [
                      "rounded-md",
                      "text-default-700",
                      "transition-opacity",
                      "data-[hover=true]:text-black",
                      "data-[hover=true]:bg-buttonopacitycolor",
                      "dark:data-[hover=true]:bg-buttonopacitycolor",
                      "data-[selectable=true]:focus:bg-default-50",
                      "data-[pressed=true]:opacity-70",
                      "data-[focus-visible=true]:ring-default-500",
                    ],
                  }}
                >
                  <DropdownSection aria-label="Profile & Actions" showDivider>
                    <DropdownItem
                      isReadOnly
                      key="profile"
                      className="h-14 gap-2 bg-buttoncolor text-white"
                      // className="opacity-100"
                    >
                      <User
                        name="Santosh Alimkar"
                        description="@santosh"
                        classNames={{
                          name: "text-white",
                          description: "text-white",
                        }}
                        avatarProps={{
                          size: "sm",
                          src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                        }}
                      />
                    </DropdownItem>
                   
                    <DropdownItem  key="Profile">Profile</DropdownItem>

                   
                    <DropdownItem key="settings">Settings</DropdownItem>
                    <DropdownItem key="new_project" endContent={""}>
                      Notification{" "}
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownSection aria-label="Preferences" showDivider>
                    <DropdownItem key="quick_search" shortcut="⌘K">
                     Dashboard
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownSection aria-label="Help & Feedback">
                    <DropdownItem key="help_and_feedback">
                      Help & Feedback
                    </DropdownItem>
                    <DropdownItem  key="logout">Log Out</DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
      </div>

        </div>
    </nav>
  )
}

export default ProfileNav