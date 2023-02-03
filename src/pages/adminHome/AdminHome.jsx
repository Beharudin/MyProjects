import Notify from '../../components/notify/Notify';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../../components/sidebar/Sidebar';
import { sbActions } from '../../store/sidebar.js';
import AddUser from '../../components/addUser/AddUser';
import SpinLoader from '../../components/spinloader/SpinLoader';
import AddGroup from '../../components/addGroup/AddGroup';
import ManageUsers from '../manageUsers/ManageUsers';
import EditForm from '../../components/editForm/EditForm';
import DisplayForm from '../../components/displayForm/DisplayForm';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const AdminHome = () => {
  console.log('adminhome');
  const dispatch = useDispatch();

  const notifType = useSelector((state) => state.ui.notif.type);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const sb = useSelector((state) => state.sb.option);
  const isPending = useSelector((state) => state.ui.isLoading);

  if (!isLoggedIn) {
    return <Navigate to='/Login' replace />;
  }
  const sidebarOptions = {
    admin: [
      <li className='has-subnav' key={1}>
        <a
          href='#'
          onClick={() => dispatch(sbActions.switch({ option: 'manageUsers' }))}
        >
          <i className='fa fas fa-tasks-alt'></i>
          <span className='nav-text'>Manage</span>
        </a>
      </li>,
      <li className='has-subnav' key={2}>
        <a
          href='#'
          onClick={() => dispatch(sbActions.switch({ option: 'addUser' }))}
        >
          <i className='fa fas fa-user-plus'></i>
          <span className='nav-text'>Add user</span>
        </a>
      </li>,
      <li className='has-subnav' key={3}>
        <a
          href='#'
          onClick={() => dispatch(sbActions.switch({ option: 'addGroup' }))}
        >
          <i className='fa fa-folder-plus'></i>
          <span className='nav-text'>Add Group</span>
        </a>
      </li>,
      <li className='has-subnav' key={3}>
        <a
          href='#'
          onClick={() => dispatch(sbActions.switch({ option: 'editForm' }))}
        >
          <i className='fa'>
            <ModeEditIcon />
          </i>
          <span className='nav-text'>Edit Forms</span>
        </a>
      </li>,
    ],
    manager: [
      <li className='has-subnav' key={1}>
        <a
          href='#'
          onClick={() => dispatch(sbActions.switch({ option: 'manageUsers' }))}
        >
          <i className='fa fas fa-tasks-alt'></i>
          <span className='nav-text'>Manage</span>
        </a>
      </li>,
    ],
    staff: [
      <li className='has-subnav' key={1}>
        <a
          href='#'
          onClick={() => dispatch(sbActions.switch({ option: 'manageUsers' }))}
        >
          <i className='fa fas fa-tasks-alt'></i>
          <span className='nav-text'>Manage</span>
        </a>
      </li>,
    ],
    customer: [
      <li className='has-subnav' key={1}>
        <a
          href='#'
          onClick={() => dispatch(sbActions.switch({ option: 'manageUsers' }))}
        >
          <i className='fa fas fa-tasks-alt'></i>
          <span className='nav-text'>Manage</span>
        </a>
      </li>,
    ],
  };

  return (
    <div>
      {notifType && <Notify />}
      {isPending && <SpinLoader />}
      {userData.role === 'admin' && (
        <Sidebar sidebarOptions={sidebarOptions.admin} />
      )}
      {userData.role === 'manager' && (
        <Sidebar sidebarOptions={sidebarOptions.manager} />
      )}
      {userData.role === 'staff' && (
        <Sidebar sidebarOptions={sidebarOptions.staff} />
      )}
      {sb && sb === 'addUser' && <AddUser />}
      {sb && sb === 'addUser' && <AddUser />}
      {sb && sb === 'addGroup' && <AddGroup />}
      {sb && sb === 'editForm' && (
        <div style={{ marginLeft: 50 }}>
          <EditForm />
        </div>
      )}
      {sb && sb === 'displayForm' && (
        <div style={{ marginLeft: 50 }}>
          <DisplayForm />
        </div>
      )}
    </div>
  );
};

export default AdminHome;
