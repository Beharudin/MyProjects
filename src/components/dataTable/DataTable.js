import { useMemo, useEffect, useState } from 'react';
import _DataTable from 'react-data-table-component';
import { StyledDiv, StyledModal } from './DataTableStyle.js';
import { useSelector, useDispatch } from 'react-redux';
import { ModalProvider } from 'styled-react-modal';
import Multiselect from 'react-bootstrap-multiselect';
import { Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { BASE_AUTH_URL, BASE_CAMADPTR_URL } from '../../index.js';
import { uiActions } from '../../store/ui.js';

let columns = [
  {
    name: 'Title',
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: 'Year',
    selector: (row) => row.year,
    sortable: true,
  },
];

const emailIsValid = () => {
  return true;
};

function convertArrayOfObjectsToCSV(array) {
  let result;

  const columnDelimiter = ',';
  const lineDelimiter = '\n';
  const keys = Object.keys(array[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach((item) => {
    let ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];

      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}
function downloadCSV(array, sb) {
  const link = document.createElement('a');
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = `${sb}.csv`;

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }
  const encodedURI = encodeURI(csv);
  const fixedEncodedURI = encodedURI.replaceAll('#', '%23');
  link.setAttribute('href', fixedEncodedURI);
  link.setAttribute('download', filename);
  link.click();
}

const Export = ({ onExport }) => (
  <button
    type='button'
    className='btn btn-primary'
    style={{ position: 'relative', right: '100px' }}
    onClick={(e) => {
      onExport(e.target.value);
    }}
  >
    export
  </button>
);

const FilterComponent = ({ filterText, onFilter }) => (
  <StyledDiv>
    <div>
      <input
        id='search'
        className='searchInput'
        type='text'
        placeholder='Filter By Email'
        aria-label='Search Input'
        value={filterText}
        onChange={onFilter}
      />
    </div>
  </StyledDiv>
);

const DataTable = (_props) => {
  const dispatch = useDispatch();

  const sb = useSelector((state) => state.sb.option);
  let data = _props.data;
  const [filteredItems, setFilteredItems] = useState(data);
  const [filterText, setFilterText] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  columns = Object.entries(data[0]);
  columns = columns.map((el) => {
    return {
      name: el[0],
      selector: (row) => row[el[0]],
      sortable: true,
    };
  });

  data = data.map((el, i) => {
    return { id: i + 1, ...el };
  });

  const subHeaderComponentMemo = useMemo(() => {
    const filter = (e) => {
      if (e.target.value) {
        setFilterText(e.target.value);
        const filterRegex = new RegExp(`^${e.target.value}`);

        const filteredData = data.filter((el) => filterRegex.test(el.email));
        setFilteredItems(filteredData);
      } else {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
        setFilteredItems(data);
      }
    };

    return <FilterComponent onFilter={filter} filterText={filterText} />;
  }, [filterText, resetPaginationToggle]);

  const actionsMemo = useMemo(
    () => (
      <Export
        onExport={() => {
          downloadCSV(filteredItems, sb);
        }}
      />
    ),
    [data, sb]
  );

  const editUserInfo = async (data) => {
    try {
      return await axios.post(`${BASE_AUTH_URL}/editUserInfo`, data);
    } catch (err) {
      dispatch(uiActions.stopLoad());
      const msg = err.response?.data?.error;
      dispatch(
        uiActions.notif({
          type: 'error',
          msg,
        })
      );
    }
  };

  const EditForm = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState(props.data);
    const [groups, setGroups] = useState([]);
    const [roles, setRoles] = useState([]);

    const Option = (props) => {
      const [checked, setChecked] = useState(props.initChecked);
      return (
        <Form.Check
          inline
          label={props.el}
          name='group'
          value={props.el}
          type='checkbox'
          onChange={() => setChecked(!checked)}
          checked={checked}
          id={`inline-checkbox-1`}
        />
      );
    };

    // handle on change according to input name and setState
    const handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      let data = new FormData(e.currentTarget);

      data = {
        userId: data.get('id'),
        email: data.get('email'),
        role: data.get('role'),
        groups: data.getAll('group'),
      };

      if (!emailIsValid(data.email)) {
        dispatch(uiActions.notif({ type: 'error', msg: 'invalid email' }));
      } else {
        dispatch(uiActions.startLoad());
        const result = await editUserInfo(data);
        try {
          _props.loadData();
          dispatch(uiActions.stopLoad());
          dispatch(
            uiActions.notif({
              type: 'success',
              msg: result.msg ? result.msg : 'operation successfull',
            })
          );
          props.setIsOpen(false);
        } catch (err) {
          console.log(err);
          dispatch(uiActions.stopLoad());
          dispatch(
            uiActions.notif({
              type: 'error',
              msg: result.msg ? result.msg : 'operation unsuccessfull',
            })
          );
          props.setIsOpen(false);
        }
      }
    };

    useEffect(() => {
      (async () => {
        try {
          const resp = await axios.get(`${BASE_CAMADPTR_URL}/getAllGroups`);
          const _groups = resp.data.map((el) => el.id);
          setGroups(_groups);

          const resp2 = await axios.get(`${BASE_AUTH_URL}/getRoles`);
          const _roles = resp2.data;
          setRoles(_roles);
        } catch (err) {
          dispatch(uiActions.stopLoad());
          const msg = err.response?.data?.error;
          dispatch(
            uiActions.notif({
              type: 'error',
              msg,
            })
          );
        }
      })();
    }, [data]);

    const keys = Object.keys(data);

    return (
      <div>
        {groups.length > 0 && (
          <form onSubmit={handleSubmit} className='container'>
            {keys.map((el) => {
              if (el != 'groups' && el != 'role' && el != 'id') {
                return (
                  <>
                    <label for={el}>{el}</label>
                    <input
                      id={el}
                      type='text'
                      name={el}
                      value={data[el]}
                      onChange={handleChange}
                    />
                    <br />
                  </>
                );
              }
              if (el === 'id') {
                return (
                  <>
                    <label for={el}>{el}</label>
                    <input
                      id={el}
                      type='text'
                      name={el}
                      value={data[el]}
                      readonly='readonly'
                    />
                    <br />
                  </>
                );
              }
              if (el === 'role') {
                const myRole = data[el];
                return (
                  <>
                    <label>Role</label>
                    <Form.Select name='role'>
                      {roles.map((el) => {
                        const selected = myRole === el ? true : false;
                        return <option selected={selected}>{el}</option>;
                      })}
                    </Form.Select>
                    <br />
                  </>
                );
              }
              if (el === 'groups') {
                const myGroups = data[el].split(', ');
                console.log('myGroups', myGroups);

                let groupOptions = { row1: [], row2: [] };
                groups.map((el, i) => {
                  let checked = false;
                  if (myGroups.includes(el)) checked = true;
                  const grOpsRef =
                    i % 2 === 0 ? groupOptions.row1 : groupOptions.row2;
                  grOpsRef.push(<Option el={el} initChecked={checked} />);
                });

                return (
                  <>
                    <label for='groupsForm'>Groups</label>
                    <Form as={Col} className='groupsForm'>
                      <div key={`inline-checkbox`} className='mb-3'>
                        {groupOptions.row1}
                        <br />
                        {groupOptions.row2}
                      </div>
                    </Form>
                    <br />
                  </>
                );
              }
            })}

            <button type='submit'>save</button>
          </form>
        )}
      </div>
    );
  };

  const FancyModalButton = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div>
        <ul className='action-buttons'>
          <li className='list-inline-item'>
            <button
              onClick={toggleModal}
              class='btn btn-success btn-sm rounded-0'
              type='button'
              data-toggle='tooltip'
              data-placement='top'
              title='Edit'
            >
              <i className='fa fa-edit'></i>
            </button>
          </li>
          <li className='list-inline-item'>
            <button
              className='btn btn-error btn-sm rounded-0'
              type='button'
              data-toggle='tooltip'
              data-placement='top'
              title='Delete'
            >
              <i className='fa fa-trash'></i>
            </button>
          </li>
        </ul>
        <StyledModal
          isOpen={isOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
        >
          <EditForm data={props.data} setIsOpen={setIsOpen} />
        </StyledModal>
      </div>
    );
  };

  const ExpandedComponent = (props) => {
    return (
      <StyledDiv>
        <div>
          <pre>{JSON.stringify(props.data, null, 2)}</pre>
          <ModalProvider>
            <FancyModalButton data={props.data} className='modalButton' />
          </ModalProvider>
        </div>
      </StyledDiv>
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        marginLeft: '50px',
        marginTop: '30px',
        marginRight: 0,
      }}
    >
      <_DataTable
        columns={columns}
        data={filteredItems}
        actions={actionsMemo}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        pagination
        fixedHeader
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        fixedHeaderScrollHeight='450px'
      />
    </div>
  );
};

export default DataTable;
