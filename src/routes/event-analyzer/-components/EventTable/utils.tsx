import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { ArrowUpDown,  Mails, MoreHorizontal, Users } from "lucide-react"
import { Link } from "@tanstack/react-router"

export type Event = {
  id: string
  name: string
  location: string
  date: string
  attendee_rsvp: { attendees: number; rsvps: number }
  rsvps: number
  attendees: number
}

export const columns: ColumnDef<Event>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Event Name",
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("location")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>
  },
  {
    accessorKey: "attendee_rsvp",
    header: "Attendees / RSVPs",
    cell: ({ row }) => {
      const { attendees, rsvps } = row.getValue("attendee_rsvp") as { attendees: number, rsvps: number }
      console.log(row.getValue("id"))
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Link to={`/event-analyzer/attendee/$eventId`} params={{ eventId: row.getValue("id") as string }} className="flex items-center">
              <Users className="h-4 w-4" />
              <span className="text-lg">{attendees || 0}</span>
            </Link>
          </div>
          /
          <div className="flex items-center gap-1">
            <Link to={`/event-analyzer/rsvp/$eventId`} params={{ eventId: row.getValue("id") as string }} className="flex items-center">
              <Mails className="h-4 w-4" />
              <span className="text-lg">{rsvps || 0}</span>
            </Link>
          </div>
        </div>
      )
        
    }
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("Status") as string

      return (
        <div className="lowercase">{status}</div>
      )
    }
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <div>
        <button></button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )
    },
  },
]