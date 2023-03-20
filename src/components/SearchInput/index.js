export default function SearchInput ({ value, onChange }) {
  return (
    <>
      <input
        className="w-1/2 h-10 p-2 ml-3 rounded-full outline-none bg-gray-200"
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
    </>
  )
}
