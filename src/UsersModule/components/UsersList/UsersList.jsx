import React, { useEffect, useState } from "react";
import ActionButtons from "../../../Shared/components/ActionButtons/ActionButtons";
import { useUsersStore } from "../../../store/usersStore";
import NoData from "../../../Shared/components/NoData/NoData";
import LoaderSpinner from "../../../Shared/components/LoaderSpinner/LoaderSpinner";
import SubHeader from "../../../Shared/components/SubHeader/SubHeader";
import Header from "../../../Shared/components/Header/Header";
import HeaderImage from "../../../assets/images/RecipesImage.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useAuthStore } from "../../../store/authStore";
import ConfirmDelete from "../../../Shared/components/ConfirmDelete/ConfirmDelete";
import Pagination from "../../../Shared/components/Pagination/Pagination";

export default function UsersList() {
  let { users, loading, fetchUsersList, pageNumber, totalNumberOfPages } =
    useUsersStore();
  let { deleteUser } = useAuthStore();
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => {
    deleteUser(selectedUser.id);
    fetchUsersList();
    handleClose();
  };
  useEffect(() => {
    fetchUsersList();
  }, []);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <div className="customCloseBtn">
            <i
              className="fa-solid fa-xmark text-right fs-4 text-danger cursor-pointer"
              onClick={handleClose}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          <ConfirmDelete Item={`User ${selectedUser?.userName}`} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Header
        imageSize={"w-50"}
        title={"List"}
        spanText={"Users"}
        imgUrl={HeaderImage}
        description="You can now add your items that any user can order it from the Application and you can edit"
      />

      <SubHeader
        title={"Users Table Details"}
        description={"You can check all details"}
        showButton={false}
      />
      <div className="table-container p-3">
        {loading ? (
          <LoaderSpinner />
        ) : users.length ? (
          <div className="table-responsive vh-100">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>creationDate</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{(pageNumber - 1) * 10 + index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{new Date(user.creationDate).toLocaleString()}</td>
                    <td>{user.email}</td>
                    <td>{user.group?.name}</td>

                    <td>
                      <div className="dropdown">
                        <li
                          className="  "
                          type="button"
                          id="dropdownMenu2"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa-solid fa-ellipsis"></i>
                        </li>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenu2"
                        >
                          <li className="dropdown-item">
                            <div
                              onClick={() => {
                                setSelectedUser(user);
                                handleShow();
                              }}
                            >
                              <i className="text-danger fa-solid fa-trash"></i>
                              <span className="mx-2">Delete</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              currentPage={pageNumber}
              totalPages={totalNumberOfPages}
              onPageChange={(page) => fetchUsersList(page)}
            />
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </>
  );
}
