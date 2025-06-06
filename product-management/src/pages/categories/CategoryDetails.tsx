import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Plus } from "lucide-react"
import { useStore } from "../../store/useStore"
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../../components/ui/Table"

export function CategoryDetails() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const products = useStore(state => 
    state.products.filter(p => p.category === categoryId && p.status === 'published')
  )
  const getCategoryName = useStore(state => state.getCategoryName)

  if (!categoryId) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{getCategoryName(categoryId)}</h2>
        <Button onClick={() => navigate(`/products/new/${categoryId}`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>KES {product.price.toLocaleString()}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
