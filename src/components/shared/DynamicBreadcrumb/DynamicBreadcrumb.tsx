import * as React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, useMatches } from "@tanstack/react-router"


export interface BreadcrumbMeta {
  title: string
  breadcrumb?: string
}

export function DynamicBreadcrumbs() {
  // const router = useRouter()
  const matches = useMatches()
  console.log(matches)
  
  // Filter out root route and get only routes with breadcrumb metadata
  const breadcrumbMatches = matches.filter((match, index) => {
    // Skip the root route (usually '/')
    return index > 0 && match.__routeContext.routeMeta
  })

  // If we only have the root route or no breadcrumbs, don't render anything
  if (breadcrumbMatches.length === 0) {
    return null
  }

  return (
    <Breadcrumb className="py-2">
      ss
      <BreadcrumbList>
        {/* Home link is always included */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {/* Render breadcrumb separator after home */}
        <BreadcrumbSeparator />
        
        {breadcrumbMatches.map((match, index) => {
          const meta = match.__routeContext.routeMeta as BreadcrumbMeta
          const isLast = index === breadcrumbMatches.length - 1
          const label = meta.breadcrumb || meta.title || "Unnamed Route"
          
          return (
            <React.Fragment key={match.id}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={match.pathname}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}