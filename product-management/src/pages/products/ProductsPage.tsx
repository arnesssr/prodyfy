import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs"
import { Search } from "lucide-react"
import { useState } from "react"
import { FolderKanban, PackageCheck, FileEdit, Archive } from 'lucide-react' // Import icons

export function ProductsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop() || 'categories'
  const [searchTerm, setSearchTerm] = useState("")

  // Filter products based on search term
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Updated search bar with onChange handler */}
      <div className="flex-1 relative max-w-md lg:max-w-lg">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 max-w-[320px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..." 
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground flex-1 outline-none"
          />
        </div>
      </div>

      <Tabs 
        value={currentPath}
        onValueChange={(value) => navigate(`/app/products/${value}`)}
      >
        <TabsList>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <FolderKanban className="h-4 w-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="published" className="flex items-center gap-2">
            <PackageCheck className="h-4 w-4" />
            Published
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex items-center gap-2">
            <FileEdit className="h-4 w-4" />
            Drafts
          </TabsTrigger>
          <TabsTrigger value="archived" className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            Archived
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-4">
        <Outlet context={{ searchTerm }} />
      </div>
    </div>
  )
}
