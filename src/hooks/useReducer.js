import GetAppIcon from "@material-ui/icons/GetApp";
export const drvierListReducer = (count, status) => {
  const driverList = {
    data: [],
    pageInfo: {
      totalData: status.pageInfo.totalData,
      currentPage: status.pageInfo.currentPage,
      dataPerPage: status.pageInfo.dataPerPage,
      totalPages: status.pageInfo.totalPages,
      startRow: status.pageInfo.startRow,
    },
  };

  status.data.forEach((item) => {
    const req = item.driver_id ? 1 : 0;
    const set = {
      id: req ? item.driver_id : item.id,
      name: req
        ? item.first_name + " " + item.last_name
        : item.firstName + " " + item.lastName,
      firstName: req ? item.first_name : item.firstName,
      lastName: req ? item.last_name : item.lastName,
      contact: req ? item.phone : item.contact,
      last: req ? item.last_date : item.last,
      memo: item.memo,
      select: item.select,
      status: item.status,
      created: item.created,
      is_denied: item.is_denied,
      logis_id: item.logis_id,
      phone: item.phone,
      last_date: item.last_date,
    };
    driverList.data.push(set);
  });
  return driverList;
};

export const truckListReducer = (count, status) => {
  const truckList = {
    data: [],
    pageInfo: {
      totalData: status.pageInfo.totalData,
      currentPage: status.pageInfo.currentPage,
      dataPerPage: status.pageInfo.dataPerPage,
      totalPages: status.pageInfo.totalPages,
      startRow: status.pageInfo.startRow,
    },
  };
  status.data.forEach((item) => {
    const req = item.truck_id ? 1 : 0;

    const set = {
      status: item.status,
      number: req ? item.regist_num : item.number,
      truckType: req ? item.truck_type_en : item.truckType,
      option: req ? item.truck_option_en : item.option,
      size: "",
      year: item.year,
      garage_name: item.garage_name,
      select: item.select,

      id: req ? item.truck_id : item.id,
      depth: item.depth,
      height: item.height,
      width: item.width,
      logisId: item.logis_id,
      truckId: item.truck_id,
      mileage: item.mileage,
      truckOptionEn: item.truck_option_en,
      truckOptionOo: item.truck_option_ko,
      truckOptionVi: item.truck_option_vi,
      truckTypeEn: item.truck_type_en,
      truckTypeKo: item.truck_type_ko,
      truckTypeVi: item.truck_type_vi,

      created: item.created,
      memo: item.memo,
      opt_id: item.opt_id,
      state: item.state,
      type_id: item.type_id,
    };
    truckList.data.push(set);
  });
  return truckList;
};

export const truckTypesReducer = (count, status) => {
  const truckTypes = [];
  status.forEach((item) => {
    const option = {
      key: item.type_id,
      value: item.en,
    };
    truckTypes.push(option);
  });
  return truckTypes;
};
export const truckOptionsReducer = (count, status) => {
  const truckOptions = [];
  status.forEach((item) => {
    const option = {
      key: item.opt_id,
      value: item.en,
    };
    truckOptions.push(option);
  });
  return truckOptions;
};
export const truckSurchargeReducer = (count, status) => {
  const truckSurcharges = {
    data: [],
    pageInfo: {
      totalData: status.pageInfo.totalData,
      currentPage: status.pageInfo.currentPage,
      dataPerPage: status.pageInfo.dataPerPage,
      totalPages: status.pageInfo.totalPages,
      startRow: status.pageInfo.startRow,
    },
    total: status.total,
  };

  status.surcharges.forEach((item) => {
    const set = {
      content: item.content,
      cost: item.cost,
      date: item.created,
      place: item.place,
      memo: item.memo,
      surchargeId: item.surcharge_id,
      receipt: <GetAppIcon />,
      s3Path: item.s3_folder,
      file_id: item.file_id,
    };
    truckSurcharges.data.push(set);
  });
  return truckSurcharges;
};
export const truckDispatchReducer = (count, status) => {
  const truckDispatches = {
    data: [],
    pageInfo: {
      totalData: status.pageInfo.totalData,
      currentPage: status.pageInfo.currentPage,
      dataPerPage: status.pageInfo.dataPerPage,
      totalPages: status.pageInfo.totalPages,
      startRow: status.pageInfo.startRow,
    },
  };
  status.dispatches.forEach((item) => {
    const set = {
      company: item.company_name,
      requestDate: item.created,
      location: {
        pu_city: item.location.pu_city,
        pu_datetime: item.location.pu_datetime,
        do_city: item.location.do_city,
        do_datetime: item.location.do_datetime,
      },
      mileage: 123,
      driver: 456,
    };

    truckDispatches.data.push(set);
  });
  return truckDispatches;
};
export const garageListReducer = (count, status) => {
  const garageDispatches = {
    garages: [],
    pageInfo: {
      totalData: status.pageInfo.totalData,
      currentPage: status.pageInfo.currentPage,
      dataPerPage: status.pageInfo.dataPerPage,
      totalPages: status.pageInfo.totalPages,
      startRow: status.pageInfo.startRow,
    },
  };
  status.garages.forEach((item) => {
    const set = {
      key: item.garage_id ? item.garage_id : item.key,
      value: item.name ? item.name : item.value,
      capacity: item.capacity,
      address: item.address,
    };

    garageDispatches.garages.push(set);
  });

  return garageDispatches;
};
