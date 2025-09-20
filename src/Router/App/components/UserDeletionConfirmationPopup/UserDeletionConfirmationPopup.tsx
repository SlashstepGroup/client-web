// import React, { useEffect, useState } from "react";
// import PopupHeader from "../Popup/components/PopupHeader/PopupHeader";
// import PopupContent from "../Popup/components/PopupContent/PopupContent";
// import Popup from "../Popup/Popup";
// import PopupFooter from "../Popup/components/PopupFooter/PopupFooter";
// import { useLocation, useNavigate } from "react-router-dom";
// import Spinner from "../Spinner/Spinner";
// import { DeleteUsersPopupConfig } from "../../App";

// function UserDeletionConfirmationPopup({shouldOpen, onCloseRequest, onClose, popupConfig}: {shouldOpen: boolean, onCloseRequest: () => void, onClose: () => void, popupConfig: DeleteUsersPopupConfig}) {

//   const location = useLocation();
//   const navigate = useNavigate();
//   const { users } = popupConfig;
//   const [didUserConfirm, setDidUserConfirm] = useState(false);
//   const [shouldDeleteUsers, setShouldDeleteUsers] = useState(false);

//   useEffect(() => {

//     (async () => {

//       // TODO: Add API call to delete users
//       if (shouldDeleteUsers) {

//         onCloseRequest();

//       }

//     })();

//   }, [shouldDeleteUsers]);

//   return (
//     <Popup shouldOpen={shouldOpen} onClose={onClose}>
//       <PopupHeader onClose={onCloseRequest} canClose={!shouldDeleteUsers}>
//         User deletion confirmation
//       </PopupHeader>
//       <PopupContent>
//         <p>Are you sure you want to delete the following users?</p>
//         {
//           users ? (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Display name</th>
//                   <th>Username</th>
//                   <th>User ID</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {
//                   users.map((user) => (
//                     <tr key={user.id}>
//                       <td>{user.displayName ?? ""}</td>
//                       <td>{user.username}</td>
//                       <td>{user.id}</td>
//                     </tr>
//                   ))
//                 }
//               </tbody>
//             </table>
//           ) : (
//             <Spinner />
//           )
//         }
//         <p>All associated data, such as access policies and workspace memberships, will also be deleted. This action cannot be undone.</p>
//         <form>
//           <section>
//             <section>
//               <input name="confirmation" type="checkbox" checked={didUserConfirm} onClick={() => setDidUserConfirm(!didUserConfirm)} />
//               <label htmlFor="confirmation" className="checkbox-label">I understand that this action cannot be undone and want to continue.</label>
//             </section>
//           </section>
//         </form>
//       </PopupContent>
//       <PopupFooter>
//         <button type="submit" className="destructive-button-filled" disabled={!didUserConfirm || shouldDeleteUsers} onClick={() => setShouldDeleteUsers(true)}>
//           <span>Delete</span>
//           {
//             shouldDeleteUsers ? (
//               <Spinner />
//             ) : null
//           }
//         </button>
//         <button type="button" disabled={shouldDeleteUsers} onClick={onCloseRequest}>Cancel</button>
//       </PopupFooter>
//     </Popup>
//   );
// }

// export default React.memo(UserDeletionConfirmationPopup);