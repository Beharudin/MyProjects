{/* <div className={"formRow"}>
                  <div className="formRowItem">
                    <label>spouse name:</label>
                    <input
                      name="form3-spouseName"
                      onChange={props.handleChange("spouseName")}
                      // onChange={changeHandler}
                      // value={formData["form3-spouseName"]}
                      value={props.values.spouseName}
                      onBlur={props.handleBlur("spouseName")}
                      type={"text"}
                      placeholder="spouse name"
                    />
                    <div>
                      {props.errors.spouseName && props.touched.spouseName && (
                        <p style={{ color: "red" }}>{props.errors.spouseName}</p>
                      )}
                    </div>
                  </div>
                  <div className="formRowItem">
                    <label>credit type:</label>
                    <input
                      name="form3-creditType"
                      onChange={props.handleChange("creditType")}
                      // onChange={changeHandler}
                      // value={formData["form3-creditType"]}
                      value={props.values.creditType}
                      onBlur={props.handleBlur("creditType")}
                      type={"text"}
                      placeholder="credit type"
                    />
                    <div>
                      {props.errors.creditType && props.touched.creditType && (
                        <p style={{ color: "red" }}>{props.errors.creditType}</p>
                      )}
                    </div>
                  </div>
                  <div className="formRowItem">
                    <label>requested amount:</label>
                    <input
                      name="form3-amount"
                      onChange={props.handleChange("requestedAmount")}
                      // onChange={changeHandler}
                      // value={formData["form3-amount"]}
                      value={props.values.requestedAmount}
                      onBlur={props.handleBlur("requestedAmount")}
                      type={"text"}
                      placeholder="requested amount"
                    />
                    <div>
                      {props.errors.requestedAmount && props.touched.requestedAmount && (
                        <p style={{ color: "red" }}>{props.errors.requestedAmount}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className={"formRow"}>
                  <div className="formRowItem">
                    <label>requested period:</label>
                    <input
                      name="form3-period"
                      onChange={props.handleChange("requestedPeriod")}
                      // onChange={changeHandler}
                      // value={formData["form3-period"]}
                      value={props.values.requestedPeriod}
                      onBlur={props.handleBlur("requestedPeriod")}
                      type={"text"}
                      placeholder="requested period"
                    />
                    <div>
                      {props.errors.requestedPeriod && props.touched.requestedPeriod && (
                        <p style={{ color: "red" }}>{props.errors.requestedPeriod}</p>
                      )}
                    </div>
                  </div>
                  <div className="formRowItem">
                    <label>requested repayment frequency:</label>
                    <input
                      name="form3-frequency"
                      onChange={props.handleChange("requestedRepaymentFrequency")}
                      // onChange={changeHandler}
                      // value={formData["form3-frequency"]}
                      value={props.values.requestedRepaymentFrequency}
                      onBlur={props.handleBlur("requestedRepaymentFrequency")}
                      type={"text"}
                      placeholder="requested repayment frequency"
                    />
                    <div>
                      {props.errors.requestedRepaymentFrequency && props.touched.requestedRepaymentFrequency && (
                        <p style={{ color: "red" }}>{props.errors.requestedRepaymentFrequency}</p>
                      )}
                    </div>
                  </div>
                  <div className="formRowItem">
                    <label>purpose of the loan:</label>
                    <input
                      name="form3-purpose"
                      onChange={props.handleChange("loandPurpose")}
                      // onChange={changeHandler}
                      // value={formData["form3-purpose"]}
                      value={props.values.loandPurpose}
                      onBlur={props.handleBlur("loandPurpose")}
                      type={"text"}
                      placeholder="purpose of the loan"
                    />
                    <div>
                      {props.errors.loandPurpose && props.touched.loandPurpose && (
                        <p style={{ color: "red" }}>{props.errors.loandPurpose}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className={"formRow"}>
                  <div className="formRowItem">
                    <label>income of the borrower:</label>
                    <input
                      name="form3-income"
                      onChange={props.handleChange("userIncome")}
                      // onChange={changeHandler}
                      // value={formData["form3-income"]}
                      value={props.values.userIncome}
                      onBlur={props.handleBlur("userIncome")}
                      type={"text"}
                      placeholder="income of the borrower"
                    />
                    <div>
                      {props.errors.userIncome && props.touched.userIncome && (
                        <p style={{ color: "red" }}>{props.errors.userIncome}</p>
                      )}
                    </div>
                  </div>
                  <div className="formRowItem">
                    <label>income of the spouse:</label>
                    <input
                      name="form3-spouseIncome"
                      onChange={props.handleChange("spouseIncome")}
                      // onChange={changeHandler}
                      // value={formData["form3-spouseIncome"]}
                      value={props.values.spouseIncome}
                      onBlur={props.handleBlur("spouseIncome")}
                      type={"text"}
                      placeholder="income of the spouse"
                    />
                    <div>
                      {props.errors.spouseIncome && props.touched.spouseIncome && (
                        <p style={{ color: "red" }}>{props.errors.spouseIncome}</p>
                      )}
                    </div>
                  </div>
                  <div className="formRowItem">
                    <label>date of birth of the spouse:</label>
                    <input
                      name="form3-spouseDob"
                      onChange={props.handleChange("spouseBirthdate")}
                      // onChange={changeHandler}
                      // value={formData["form3-spouseDob"]}
                      value={props.values.spouseBirthdate}
                      onBlur={props.handleBlur("spouseBirthdate")}
                      type={"text"}
                      placeholder="date of birth of the spouse"
                    />
                    <div>
                      {props.errors.spouseBirthdate && props.touched.spouseBirthdate && (
                        <p style={{ color: "red" }}>{props.errors.spouseBirthdate}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="formRow">
                  <div className="formRowItem">
                    <label>source of repayment:</label>
                    <input
                      name="form3-repaySource"
                      onChange={props.handleChange("repaymentSource")}
                      // onChange={changeHandler}
                      // value={formData["form3-repaySource"]}
                      value={props.values.repaymentSource}
                      onBlur={props.handleBlur("repaymentSource")}
                      type={"text"}
                      placeholder="source of repayment"
                    />
                    <div>
                      {props.errors.repaymentSource && props.touched.repaymentSource && (
                        <p style={{ color: "red" }}>{props.errors.repaymentSource}</p>
                      )}
                    </div>
                  </div>
                  <div className="formRowItem">
                    <label>TIN number of the borrower:</label>
                    <input
                      name="form3-tinNumber"
                      onChange={props.handleChange("tinNumber")}
                      // value={formData["form3-tinNumber"]}
                      value={props.values.tinNumber}
                      onBlur={props.handleBlur("tinNumber")}
                      type={"text"}
                      placeholder="TIN number of the borrower"
                    />
                    <div>
                      {props.errors.tinNumber && props.touched.tinNumber && (
                        <p style={{ color: "red" }}>{props.errors.tinNumber}</p>
                      )}
                    </div>
                  </div>
                  <div className="formRowItem">
                    <label>TIN number spouse:</label>
                    <input
                      name="form3-spouseTinNumber"
                      onChange={props.handleChange("spouseTinNumber")}
                      // onChange={changeHandler}
                      // value={formData["form3-spouseTinNumber"]}
                      value={props.values.spouseTinNumber}
                      onBlur={props.handleBlur("spouseTinNumber")}
                      type={"text"}
                      placeholder="TIN number spouse"
                    />
                    <div>
                      {props.errors.spouseTinNumber && props.touched.spouseTinNumber && (
                        <p style={{ color: "red" }}>{props.errors.spouseTinNumber}</p>
                      )}
                    </div>
                  </div>
                </div> */}