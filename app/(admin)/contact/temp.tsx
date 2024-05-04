"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImperativePanelHandle, PanelOnCollapse } from "react-resizable-panels";
import { MdOutlineMarkEmailUnread } from "react-icons/md";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSocket } from "@/components/providers/socket-provider";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ArchiveIcon,
  ArchiveXIcon,
  ArrowLeftIcon,
  ChevronsUpDown,
  InboxIcon,
  OctagonAlertIcon,
  PanelLeftClose,
  Trash2Icon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format, formatDistanceToNow } from "date-fns";
import { editContact, getContact } from "@/service/api/contact";
import { Contact, EditContact } from "@/schemas/contact";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { vi } from "date-fns/locale";

const ContactPage = () => {
  const { socket } = useSocket();
  const ref = useRef<ImperativePanelHandle>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [tab, setTab] = useState<string>("Inbox");
  const [selected, setSelected] = useState<Contact>();

  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await getContact();
      setContacts(contacts);
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    if (socket)
      socket.on("contact", (data: Contact) => {
        setContacts((prev) => [data, ...prev]);
      });
  }, [socket]);

  const handleActionContact = async (id: string, data: EditContact) => {
    setSelected(undefined);
    setContacts(
      contacts.map<Contact>((contact) =>
        id != contact.id ? contact : { ...contact, ...data }
      )
    );
    await editContact(id, data);
  };

  return (
    <ScrollArea className="w-full bg-background">
      <ResizablePanelGroup direction="horizontal" className="min-w-[800px]">
        <ResizablePanel
          ref={ref}
          data-collapsed={isCollapsed}
          onCollapse={() => {
            setIsCollapsed(true);
          }}
          onExpand={() => {
            setIsCollapsed(false);
          }}
          className={cn(
            "h-screen group",
            isCollapsed
              ? "min-w-[50px] transition-all duration-300 ease-in-out"
              : ""
          )}
          defaultSize={20}
          maxSize={20}
          minSize={15}
          collapsible
          collapsedSize={1}
        >
          <TooltipProvider delayDuration={100} disableHoverableContent={true}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/manager"
                  className={cn(
                    "flex items-center justify-center h-[52px] gap-2 hover:bg-muted",
                    isCollapsed ? "" : "px-2"
                  )}
                >
                  <ArrowLeftIcon className="flex flex-shrink-0 size-6 mx-1.5" />
                  <p className={cn(isCollapsed ? "hidden" : "w-full truncate")}>
                    Go To Manager
                  </p>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                align="center"
                side="right"
                className="group-[[data-collapsed=false]]:hidden"
              >
                <p>Go To Manager</p>
              </TooltipContent>
            </Tooltip>

            <Separator />
            <div className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
              <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => {
                        setTab("Inbox");
                        setSelected(undefined);
                      }}
                      variant={tab == "Inbox" ? "secondary" : "ghost"}
                    >
                      <InboxIcon className="lucide lucide-inbox group-[[data-collapsed=false]]:mr-2 size-4 flex-shrink-0" />
                      <p className="w-full text-start group-[[data-collapsed=true]]:hidden">
                        Inbox
                      </p>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    align="center"
                    side="right"
                    className="group-[[data-collapsed=false]]:hidden"
                  >
                    <p>Inbox</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => {
                        setTab("Archive");
                        setSelected(undefined);
                      }}
                      variant={tab == "Archive" ? "secondary" : "ghost"}
                    >
                      <ArchiveIcon className="lucide lucide-inbox group-[[data-collapsed=false]]:mr-2 size-4 flex-shrink-0" />
                      <p className="w-full text-start group-[[data-collapsed=true]]:hidden">
                        Archive
                      </p>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    align="center"
                    side="right"
                    className="group-[[data-collapsed=false]]:hidden"
                  >
                    <p>Archive</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => {
                        setTab("Junk");
                        setSelected(undefined);
                      }}
                      variant={tab == "Junk" ? "secondary" : "ghost"}
                    >
                      <OctagonAlertIcon className="lucide lucide-inbox group-[[data-collapsed=false]]:mr-2 size-4 flex-shrink-0" />
                      <p className="w-full text-start group-[[data-collapsed=true]]:hidden">
                        Junk
                      </p>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    align="center"
                    side="right"
                    className="group-[[data-collapsed=false]]:hidden"
                  >
                    <p>Junk</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => setTab("Trash")}
                      variant={tab == "Trash" ? "secondary" : "ghost"}
                    >
                      <Trash2Icon className="lucide lucide-inbox group-[[data-collapsed=false]]:mr-2 size-4 flex-shrink-0" />
                      <p className="w-full text-start group-[[data-collapsed=true]]:hidden">
                        Trash
                      </p>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    align="center"
                    side="right"
                    className="group-[[data-collapsed=false]]:hidden"
                  >
                    <p>Trash</p>
                  </TooltipContent>
                </Tooltip>
              </nav>
            </div>
          </TooltipProvider>
        </ResizablePanel>
        <ResizableHandle withHandle />
        {!selected ? (
          <ResizablePanel defaultSize={80} minSize={30} maxSize={99}>
            <Tabs defaultValue="all" className="h-screen overflow-hidden">
              <div className="flex items-center px-4 py-2 h-[52px]">
                <h1 className="text-xl font-bold">{tab}</h1>
                {tab == "Inbox" && (
                  <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ml-auto">
                    <TabsTrigger value="all" className="rounded-lg">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="rounded-lg">
                      Unread
                    </TabsTrigger>
                  </TabsList>
                )}
              </div>
              <Separator />
              <ScrollArea className="h-[calc(100vh_-_53px)] ">
                {tab == "Inbox" ? (
                  <>
                    <TabsContent value="all" className="mt-0">
                      <div className="flex flex-col gap-2 p-4">
                        {contacts
                          .filter((c) => c.contactTag == "NORMAL")
                          .map((contact) => (
                            <button
                              onClick={() => {
                                if (!contact.isReaded)
                                  handleActionContact(contact.id, {
                                    isReaded: true,
                                  });
                                setSelected(contact);
                              }}
                              key={contact.id}
                              className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent "
                            >
                              <div className="flex w-full flex-col gap-1">
                                <div className="flex items-center">
                                  <div className="flex items-center gap-2">
                                    <div className="font-semibold">
                                      {contact.name}
                                    </div>
                                    {!contact.isReaded && (
                                      <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                                    )}
                                  </div>
                                  <div className="ml-auto text-xs text-foreground">
                                    {formatDistanceToNow(
                                      new Date(contact.createdAt)
                                    )}
                                  </div>
                                </div>

                                <div className="text-xs font-medium">
                                  Topic: {contact.productName}
                                </div>
                              </div>
                              <div className="line-clamp-2 text-xs text-muted-foreground">
                                {contact.description}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className="rounded-md">contact</Badge>
                              </div>
                            </button>
                          ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="unread" className="mt-0">
                      <div className="flex flex-col gap-2 p-4">
                        {contacts
                          .filter((contact) => !contact.isReaded)
                          .map((contact) => (
                            <button
                              onClick={() => {
                                if (!contact.isReaded)
                                  handleActionContact(contact.id, {
                                    isReaded: true,
                                  });
                                setSelected(contact);
                              }}
                              key={contact.id}
                              className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted"
                            >
                              <div className="flex w-full flex-col gap-1">
                                <div className="flex items-center">
                                  <div className="flex items-center gap-2">
                                    <div className="font-semibold">
                                      {contact.name}
                                    </div>
                                    {!contact.isReaded && (
                                      <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                                    )}
                                  </div>
                                  <div className="ml-auto text-xs text-foreground">
                                    {formatDistanceToNow(
                                      new Date(contact.createdAt)
                                    )}
                                  </div>
                                </div>
                                <div className="text-xs font-medium">
                                  Topic: {contact.productName}
                                </div>
                              </div>
                              <div className="line-clamp-2 text-xs text-muted-foreground">
                                {contact.description}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className="rounded-md">contact</Badge>
                              </div>
                            </button>
                          ))}
                      </div>
                    </TabsContent>
                  </>
                ) : (
                  <div className="h-[3000px]">asdasd</div>
                )}
              </ScrollArea>
            </Tabs>
          </ResizablePanel>
        ) : (
          <ResizablePanel defaultSize={80} minSize={30} maxSize={99}>
            <div className="flex h-full flex-col">
              <div className="flex items-center p-2">
                <div className="flex items-center gap-2">
                  <TooltipProvider
                    delayDuration={100}
                    disableHoverableContent={true}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            setSelected(undefined);
                          }}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground size-9 mr-4"
                        >
                          <PanelLeftClose className="size-4" />
                          <span className="sr-only">Back</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Back</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            handleActionContact(selected.id, {
                              contactTag: "ARCHIVE",
                            });
                          }}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                        >
                          <ArchiveIcon className="size-4" />
                          <span className="sr-only">Move to archive</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Archive</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            handleActionContact(selected.id, {
                              contactTag: "TRASH",
                            });
                          }}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                        >
                          <Trash2Icon className="size-4" />
                          <span className="sr-only">Move to trash</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Trash</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            handleActionContact(selected.id, {
                              isReaded: false,
                            });
                          }}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                        >
                          <MdOutlineMarkEmailUnread className="size-4" />
                          <span className="sr-only">Move to unread</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Unread</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => {
                            handleActionContact(selected.id, {
                              contactTag: "JUNK",
                            });
                          }}
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                        >
                          <OctagonAlertIcon className="size-4" />
                          <span className="sr-only">Move to junk</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Junk</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <Separator />
              <div className="flex items-start p-4">
                <div className="flex items-start gap-4 text-sm">
                  <div className="grid gap-1">
                    <div className="font-semibold">{selected.productName}</div>
                    <div className="line-clamp-1 text-xs">
                      Who: {selected.name}
                    </div>
                    <div className="line-clamp-1 text-xs">
                      <span className="font-medium">Phone:</span>{" "}
                      {selected.phone}
                    </div>
                    {selected.email && (
                      <div className="line-clamp-1 text-xs">
                        <span className="font-medium">Email:</span>{" "}
                        {selected.email}
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">
                  {format(selected.createdAt, "MMM dd yyy, pp")}
                </div>
              </div>
              <Separator />
              <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                {selected.description}
              </div>
            </div>
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ContactPage;
