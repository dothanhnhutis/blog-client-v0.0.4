"use client";

import React, { useEffect, useRef, useState } from "react";
import { ImperativePanelHandle, PanelOnCollapse } from "react-resizable-panels";

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
  Trash2Icon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatDistanceToNow } from "date-fns";
import { editContact, getContact } from "@/service/api/contact";
import { Contact } from "@/schemas/contact";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const ContactPage = () => {
  const { socket } = useSocket();
  const ref = useRef<ImperativePanelHandle>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

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

  const handleReadContact = async (id: string) => {
    setContacts(
      contacts.map<Contact>((contact) =>
        id != contact.id ? contact : { ...contact, isReaded: true }
      )
    );
    await editContact(id, { isReaded: true });
  };

  return (
    // <div className="w-full xl:max-w-screen-xl xl:mx-auto p-4 overflow-hidden">
    <ScrollArea className="w-full bg-background">
      <ResizablePanelGroup direction="horizontal" className="min-w-[930px]">
        <ResizablePanel
          ref={ref}
          onCollapse={() => {
            setIsCollapsed(true);
          }}
          onExpand={() => {
            setIsCollapsed(false);
          }}
          className={cn(
            "h-screen",
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
          <div
            className={cn(
              "flex items-center justify-center h-[52px]",
              isCollapsed ? "" : "px-2"
            )}
          >
            <Link href="/manager" className="flex items-center justify-end">
              <ArrowLeftIcon className="size-6" />
              <p className={cn(isCollapsed ? "hidden" : "")}>Go To Manager</p>
            </Link>
          </div>
          <Separator />
          asdsa
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={30}
          minSize={30}
          maxSize={50}
          className="h-screen"
        >
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Contact</h1>
              <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ml-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <ScrollArea className="">
              <TabsContent value="all" className="mt-0 ">
                <div className="flex flex-col gap-2 p-4">
                  {contacts.map((contact) => (
                    <button
                      onClick={() => {
                        if (!contact.isReaded) handleReadContact(contact.id);
                      }}
                      key={contact.id}
                      className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted"
                    >
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">{contact.name}</div>
                            {!contact.isReaded && (
                              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                            )}
                          </div>
                          <div className="ml-auto text-xs text-foreground">
                            {formatDistanceToNow(new Date(contact.createdAt))}
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
                          if (!contact.isReaded) handleReadContact(contact.id);
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
                              {formatDistanceToNow(new Date(contact.createdAt))}
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
            </ScrollArea>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full flex-col">
            <div className="flex items-center p-2">
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                  data-state="closed"
                >
                  <ArchiveIcon className="size-4" />
                  <span className="sr-only">Archive</span>
                </button>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                  data-state="closed"
                >
                  <ArchiveXIcon className="size-4" />
                  <span className="sr-only">Move to junk</span>
                </button>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
                  data-state="closed"
                >
                  <Trash2Icon className="size-4" />
                  <span className="sr-only">Move to trash</span>
                </button>
              </div>
            </div>
            <Separator />
            <div className="flex items-start p-4">
              <div className="flex items-start gap-4 text-sm">
                <div className="grid gap-1">
                  <div className="font-semibold">Emily Davis</div>
                  <div className="line-clamp-1 text-xs">
                    Re: Question about Budget
                  </div>
                  <div className="line-clamp-1 text-xs">
                    <span className="font-medium">Phone:</span>{" "}
                    emilydavis@example.com
                  </div>
                  <div className="line-clamp-1 text-xs">
                    <span className="font-medium">Email:</span> N/A
                  </div>
                </div>
              </div>
              <div className="ml-auto text-xs text-muted-foreground">
                Mar 25, 2023, 1:15:00 PM
              </div>
            </div>
            <Separator />
            <div className="flex-1 whitespace-pre-wrap p-4 text-sm">{`I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources.

I've reviewed the budget report and identified a few areas where we might be able to optimize our spending without compromising the project's quality.

I've attached a detailed analysis for your reference. Let's discuss this further in our next meeting.

Thanks, Emily`}</div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
    // </div>
  );
};

export default ContactPage;
