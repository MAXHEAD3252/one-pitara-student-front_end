import clsx from "clsx";
import { useState } from "react";
import { KTIcon } from "../../../../helpers";
import { CreateAppModal, Dropdown4 } from "../../../../partials";
import { useLayout } from "../../../core";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {
  toggleView: (isChecked: boolean) => void;
};

const ToolbarListView = ({ toggleView = () => {} }: Props) => {
  const [showCreateAppModal, setShowCreateAppModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const { config, classes } = useLayout();
  if (!config.app?.toolbar?.display) {
    return null;
  }

  const handlePrimaryButtonClick = () => {
    setShowCreateAppModal(true);
    console.log("clicked");
  };
  const handleClick = () => {
    navigate("/lead-generation");
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleModalClose = () => {
    setShowCreateAppModal(false);
  };

  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    toggleView(isChecked);
  }, [isChecked]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const settingsButtonClass = config.app?.toolbar?.fixed?.desktop
    ? "btn-light"
    : "bg-body btn-color-gray-700 btn-active-color-primary";

  return (
    <div
      id="kt_app_toolbar"
      className={clsx(
        "app-toolbar mb-5",
        // classes.toolbar.join(" "),
        config?.app?.toolbar?.class
      )}
      style={{
        height: "100px",
        // border: "1px solid black",
        alignItems: "baseline",
      }}
    >
      <div
        id="kt_app_toolbar_container"
        className={clsx(
          "app-container",
          classes.toolbarContainer.join(" "),
          config.app?.toolbar?.containerClass,
          config.app?.toolbar?.minimize?.enabled ? "app-toolbar-minimize" : "",

          {
            "container-fluid": config.app?.toolbar?.container === "fluid",
            "container-xxl": config.app?.toolbar?.container === "fixed",
            "d-flex": true,
            "justify-content-between": true,
            "align-items-start": true,
            "p-0": true,
            "m-0": true,
          }
        )}
      >
        {/* {isPageTitleVisible && <PageTitleWrapper />} */}
        <div>
          <div className="mb-2">
              <span className="fs-2 text-gray-700 fw-bold">Select Criteria</span>
            </div>
          <div className="d-flex mb-3 align-middle">
            <div className="d-flex my-auto">
              <span className="fs-7 text-gray-700 fw-bold me-3 text-start">
                Select 
              </span>
            </div>
            <div className="me-3  d-flex my-auto">
              <input type="radio" name="class" id="class" />{" "}
              <label className="mx-2">Class</label>
            </div>
            <div className="me-3 d-flex my-auto">
              <input type="radio" name="class" id="class" />{" "}
              <label className="mx-2">Payment Id</label>
            </div>
            <div className="me-3 d-flex my-auto">
              <input type="radio" name="class" id="class" />{" "}
              <label className="mx-2">Fee Group</label>
            </div>
            <div>
              <input
                type="text"
                className="form-control form-control-sm form-control-solid w-200px  border border-gray-500"
                name="Search Team"
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Team"
              />
            </div>
          </div>

          <div className="d-flex align-items-center">
            {/* begin::Input group */}
            <div className="me-3  rounded ">
              {/* begin::Select */}
              <select
                className="form-select form-select-sm form-select-solid border border-gray-500"
                data-control="select2"
                data-placeholder="Latest"
                data-hide-search="true"
                // value={'0'}
                // onChange={(e) => setProgress(e.target.value)}
              >
                <option value="0">All Classes</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
              {/* end::Select */}
            </div>
            {/* end::Input group- */}

            {/* begin::Input group- */}
            <div className="m-0  rounded">
              {/* begin::Select */}
              <select
                className="form-select form-select-sm form-select-solid w-md-125px border border-gray-500"
                data-control="select2"
                data-placeholder="Filters"
                data-hide-search="true"
                // value={"1"}
                // onChange={(e) => setFilter(e.target.value)}
              >
                <option value="0">All Sections</option>
                <option value="1">Section A</option>
                <option value="2">Section B</option>
                <option value="3">Section C</option>
              </select>
              {/* end::Content */}
            </div>
            {/* end::Input group- */}
          </div>
        </div>
        {/* hello  */}
        
        
        <div className="d-flex align-items-center gap-2 gap-lg-3">
          <div className="d-flex justify-center mt-1 me-5">
          <label className="form-check-label me-2 text-black" htmlFor="toggleLeft">
                List View
              </label>
            <div className="form-check form-switch custom me-2">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="toggleLeft"
                checked={isChecked}
                onChange={handleToggle}
                style={{ transition: 'transform 0.3s ease-in-out' }}
              />
              
            </div>
          </div>
          <div className="d-flex align-items-center flex-shrink-0">
            {/* begin::Label */}
            <span className="fs-7 fw-bold text-gray-700 flex-shrink-0 pe-4 d-none d-md-block">
              Filter By:
            </span>
            {/* end::Label */}

            <div className="flex-shrink-0">
              <ul className="nav">
                <li className="nav-item rounded">
                  <a
                    className="nav-link btn btn-sm btn-color-muted btn-active-color-primary btn-active-light active fw-semibold fs-7 px-4 me-1"
                    data-bs-toggle="tab"
                    href="#"
                    onClick={handleClick}
                  >
                    3M
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link btn btn-sm btn-color-muted btn-active-color-primary btn-active-light fw-semibold fs-7 px-4 me-1"
                    data-bs-toggle="tab"
                    href=""
                  >
                    6M
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link btn btn-sm btn-color-muted btn-active-color-primary btn-active-light fw-semibold fs-7 px-4"
                    data-bs-toggle="tab"
                    href="#"
                  >
                    YTD
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="bullet bg-secondary h-35px w-1px mx-5"></div>

          {config.app?.toolbar?.primaryButton && (
            <a
              href="#"
              onClick={handlePrimaryButtonClick}
              className="btn btn-sm fw-bold btn-primary"
            >
              {selectedDate.toLocaleDateString()}{" "}
              <KTIcon iconName="calendar-8" className="fs-1 ms-2 me-0" />
            </a>
          )}
          <CreateAppModal
            show={showCreateAppModal}
            handleClose={handleModalClose}
            selectDate={handleDateChange}
          />
          {config.app?.toolbar?.filterButton && (
            <div className="m-0">
              <a
                href="#"
                className={clsx("btn btn-sm  fw-bold", settingsButtonClass)}
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
              >
                <KTIcon iconName="setting" className="fs-1" />
              </a>
              <Dropdown4 />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { ToolbarListView };
