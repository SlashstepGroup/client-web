import React, { useEffect } from "react";
import BreadcrumbList from "../../../../../../components/BreadcrumbList/BreadcrumbList";
import Breadcrumb from "../../../../../../components/Breadcrumb/Breadcrumb";
import WorldIcon from "../../../../../../icons/WorldIcon";
import ClipboardIcon from "../../../../../../icons/ClipboardIcon";
import ListIcon from "../../../../../../icons/ListIcon";
import { searchBar as searchBarStyle, main as mainStyle, selectAllButtonContainer as selectAllButtonContainerStyle, tableContainer as tableContainerStyle, itemGroup as itemGroupStyle, itemGroupContainer as itemGroupContainerStyle } from "./ProjectBoardPage.module.css";
import TabList from "../../../../../../components/TabList/TabList";
import Tab from "../../../../../../components/Tab/Tab";
import CloseIcon from "../../../../../../icons/CloseIcon";

function ProjectBoardPage() {

  useEffect(() => {

    document.title = "Project Board • Waltz";

  }, []);

  return (
    <section id="main-container">
      <BreadcrumbList>
        <Breadcrumb icon={<WorldIcon />} link="/workspaces/everyone-destroys-the-world">
          Everyone Destroys the World Group
        </Breadcrumb>
        <Breadcrumb icon={<ClipboardIcon />} link="/workspaces/everyone-destroys-the-world/projects/story">
          Story
        </Breadcrumb>
        <Breadcrumb icon={<ListIcon />} link="/workspaces/everyone-destroys-the-world/projects/story">
          Board
        </Breadcrumb>
      </BreadcrumbList>
      <main id={mainStyle}>
        <TabList>
          <Tab link="#" isSelected={true}>
            <span>All items</span>
          </Tab>
        </TabList>
        <input type="text" id={searchBarStyle} placeholder="No filter" />
        <section id={itemGroupContainerStyle}>
          <section className={itemGroupStyle}>
            <section>
              <span>Field Group #1</span>
            </section>
            <section className={tableContainerStyle}>
              <table cellSpacing={0}>
                <colgroup />
                <colgroup />
                <thead>
                  <tr>
                    <th scope="col" id={selectAllButtonContainerStyle}>
                      <input type="checkbox" />
                    </th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <a href="#">Test item 1</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <a href="#">Test item 2</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <a href="#">Test item 3</a>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input type="text" placeholder="Add a new item" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </section>
          <section className={itemGroupStyle}>
            <section>
              <span>Field Group #2</span>
            </section>
            <section className={tableContainerStyle}>
              <table cellSpacing={0}>
                <colgroup />
                <colgroup />
                <thead>
                  <tr>
                    <th scope="col" id={selectAllButtonContainerStyle}>
                      <input type="checkbox" />
                    </th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <a href="#">Test item 1</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <a href="#">Test item 2</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <a href="#">Test item 3</a>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input type="text" placeholder="Add a new item" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </section>
          <section className={itemGroupStyle}>
            <section>
              <span>Field Group #2</span>
            </section>
            <section className={tableContainerStyle}>
              <table cellSpacing={0}>
                <colgroup />
                <colgroup />
                <thead>
                  <tr>
                    <th scope="col" id={selectAllButtonContainerStyle}>
                      <input type="checkbox" />
                    </th>
                    <th scope="col">Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <a href="#">Test item 1</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <a href="#">Test item 2</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>
                      <a href="#">Test item 3</a>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <input type="text" placeholder="Add a new item" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </section>
        </section>
      </main>
    </section>
  );

}

export default React.memo(ProjectBoardPage);