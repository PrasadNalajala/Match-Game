import './index.css'

const TabItem = props => {
  const {tabItem, activeTab, onChangeTab} = props
  const isTabActive = tabItem.tabId === activeTab && 'active'
  const changeTab = () => {
    onChangeTab(tabItem.tabId)
  }

  return (
    <li>
      <button
        type="button"
        className={`tab ${isTabActive}`}
        onClick={changeTab}
      >
        {tabItem.displayText}
      </button>
    </li>
  )
}

export default TabItem
