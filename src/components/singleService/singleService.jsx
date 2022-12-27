import React from "react";
import "./singleService.scss";
import { services } from "../../assets/files/service";
import { Link } from "react-router-dom";

function SingleService() {
  return (
    <div className="single-service">
      <div class="row">
        <div class="col-md-9 singleMain">
          <div className="mainService">
            <h3 class="title">Debt consolidation loan</h3>
            <img
              src="https://picsum.photos/600/300"
              alt="..."
              class="mainImg"
            />
            <p className="mainDesc">
              Debt consolidation loans allow you to roll multiple debts into one
              with a new interest rate and repayment term. The key perks to a
              debt consolidation can include: Repaying your debt with a lower
              interest rate Shortening or extending the amount of time you’re in
              debt Getting a fixed interest rate when you may have had a
              variable rate Reducing the number of debt payments you make each
              month Switching to a preferred lender with better customer service
              In most cases, when you’re approved for a debt consolidation loan,
              the lender will deposit funds into your bank account. You’ll then
              use that money to pay off your old debts (though in some cases,
              the lender will pay off your creditors directly). Depending on the
              lender, you could borrow from $2,000 to $35,000 or more. Depending
              on your credit and the type of debt you’re carrying, debt
              consolidation loans can help you repay your debt at a lower rate.
              When comparing your loan options, pay attention to loan APRs, or
              annual percentage rates. This rate represents the interest rate
              plus fees, and is a more accurate representation of your cost of
              borrowing. The best rates are offered to borrowers with excellent
              credit and finances. These borrowers may also consider a balance
              transfer credit card as a potentially more affordable way to
              consolidate or refinance credit card debt. If you have bad credit,
              however, a debt consolidation loan may not be a viable way to save
              money over repayment, unless you have debt with exceptionally high
              rates.
            </p>
          </div>
        </div>
        <div class="col-md-3 singleSide">
          <h4 className="title text-center">Latest Loan Services</h4>
          {services.map((service) => (
            <Link className="Link" to="/single/12345">
              <div class="row">
                <heading class="serviceTitle">{service.title}</heading>
                <img src={service.img} alt="" class="serviceImg" />
                <p className="serviceDesc">{service.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleService;
