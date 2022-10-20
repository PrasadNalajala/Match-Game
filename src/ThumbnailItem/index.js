import './index.css'

const ThumbnailItem = props => {
  const {thumbnailItem, onclickThumbnail} = props
  const clickThumbnail = () => {
    onclickThumbnail(thumbnailItem)
  }
  return (
    <li>
      <button className="thumbnailBtn" type="button" onClick={clickThumbnail}>
        <img
          src={thumbnailItem.thumbnailUrl}
          alt="thumbnail"
          className="thumbnail"
        />
      </button>
    </li>
  )
}

export default ThumbnailItem
