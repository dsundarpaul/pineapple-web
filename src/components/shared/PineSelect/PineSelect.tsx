import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Link } from '@tanstack/react-router'

type PineSelectProps = {
  options: string[],
}

const PineSelect = ({ options }: PineSelectProps) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        {options.map((item, idx) => (
          <SelectItem value={item} key={idx}>{item}</SelectItem>
        ))}
        <SelectItem value={'SelectItem-add-product'}>
          <Link to={''}>
            Add Product
          </Link>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export default PineSelect