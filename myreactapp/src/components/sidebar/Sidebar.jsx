import React from 'react'
import './sidebar.css'
import {RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,} from '@mui/icons-material'
import CloseFriend from '../closeFriend/CloseFriend'
import {Posts, Users} from '../../dummyData'

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <ul className='sidebarlist'>
          <li className="sidebarListItem">
            <RssFeed className='sidebarIcon'/>
            <span className="sidebarListItemtext">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className='sidebarIcon'/>
            <span className="sidebarListItemtext">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className='sidebarIcon'/>
            <span className="sidebarListItemtext">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className='sidebarIcon'/>
            <span className="sidebarListItemtext">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className='sidebarIcon'/>
            <span className="sidebarListItemtext">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className='sidebarIcon'/>
            <span className="sidebarListItemtext">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className='sidebarIcon'/>
            <span className="sidebarListItemtext">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className='sidebarIcon'/>
            <span className="sidebarListItemtext">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className='sidebarIcon'/>
            <span className="sidebarListItemtext">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className='sidebarHr'/>
        <ul className="sidebarFriendList">
          {Users.map(u=>(
            <CloseFriend key={u.id} user={u}/>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
