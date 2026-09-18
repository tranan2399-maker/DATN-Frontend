import { useSearchParams } from 'react-router-dom'
import HashLoader from 'react-spinners/HashLoader'
import { useAllCategory } from '@/pages/Showtimes/hooks'
import { categoriesAction } from '@/store/category'
import { useDispatch } from 'react-redux'
const CateSelector = () => {
  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const userCategory = searchParams.get('category') || 'All'

  const { data: categoryData, isLoading } = useAllCategory()

  const handleSelectedCategoryId = (cate: {
    _id: string
    name: string
    products: []
  }) => {
    setSearchParams({ category: cate.name })
    dispatch(categoriesAction.chooseCate(cate._id))
  }

  if (isLoading) {
    return (
      <HashLoader
        cssOverride={{ display: 'block', margin: '4.8rem auto' }}
        color="#eb3656"
      />
    )
  }

  const checkedColor = (val: string) => {
    return {
      backgroundColor: val === userCategory ? '#ef5e78' : '',
      border: val === userCategory ? '2px solid transparent' : ''
    }
  }

  const renderCategory = () => {
    return categoryData?.map(
      (cate: { _id: string; name: string; products: [] }, idx: number) => {
        return (
          <div
            className="genre-input-container shadow-md"
            key={idx}
            style={checkedColor(cate.name)}
          >
            <input
              type="radio"
              name="Select Category"
              value={cate.name}
              onChange={() => handleSelectedCategoryId(cate)}
              checked={cate.name === userCategory}
            />

            <label
              className="form-genre-detail text-primary-nameMovie font-semibold dark:font-normal"
              htmlFor={cate.name}
            >
              {cate.name}
            </label>
          </div>
        )
      }
    )
  }

  return (
    <div className="genre-container">
      <div className="genre-icon-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="genre-icon"
          viewBox="0 0 512 512"
        >
          <path
            d="M35.4 87.12l168.65 196.44A16.07 16.07 0 01208 294v119.32a7.93 7.93 0 005.39 7.59l80.15 26.67A7.94 7.94 0 00304 440V294a16.07 16.07 0 014-10.44L476.6 87.12A14 14 0 00466 64H46.05A14 14 0 0035.4 87.12z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        </svg>
      </div>
      {renderCategory()}
    </div>
  )
}
export default CateSelector
