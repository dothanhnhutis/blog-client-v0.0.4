import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CheckIcon, LockIcon, MailIcon } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
const SettingPage = () => {
  return (
    <div className="w-full xl:max-w-screen-xl xl:mx-auto p-2 sm:p-4 overflow-hidden">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/account">Account</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="lg:text-2xl font-bold text-lg">Settings</h2>
      <p className="text-sm text-muted-foreground">
        Update your account settings
      </p>
      <div className="flex flex-col gap-y-4 max-w-[800px] mt-4 bg-background p-4 rounded-md">
        <div className="space-y-3">
          <Label className="text-accent-foreground">Email & Password</Label>
          <div className="flex items-center gap-2">
            <Input
              disabled={true}
              value={"gaconght@gmail.com"}
              type="email"
              name="name"
              className="focus-visible:ring-transparent"
            />
            <CheckIcon className="text-green-400" />
          </div>
          <p className="text-xs text-muted-foreground">
            This email will be your login information
          </p>
          <div className="flex gap-4 flex-wrap">
            {/* <Button>
              <MailIcon className="size-4 mr-2" /> Change Email
            </Button> */}
            <Button asChild>
              <Link href="/account/settings/change-password">
                <LockIcon className="size-4 mr-2" />
                Change Password
              </Link>
            </Button>
          </div>
        </div>

        {/* <div className="space-y-2">
          <Label className="text-accent-foreground">
            Two-factor Authentication
          </Label>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-light text-muted-foreground">
              Do you want this account to be activated?
            </p>
            <Switch
              // disabled={isPending}
              id="status"
              checked={true}
              // onCheckedChange={(checked) =>
              //   setForm((prev) => ({ ...prev, isActive: checked }))
              // }
            />
          </div>
        </div> */}

        <div className="space-y-2">
          <Label className="text-red-500">Delete Account</Label>
          <p className="text-xs font-light text-muted-foreground">
            Once you delete your account, you will lose access to your account.
            Please be certain.
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete your account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Once you delete your account, you will lose access to your
                  account. Please be certain.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
