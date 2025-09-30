import { useEffect, useState } from "react";
import TotalLeadsClosed from "../components/TotalLeadsClosed";
import LeadClosedBySalesAgent from "../components/LeadClosedBySalesAgent";
import LeadStatusDistribution from "../components/LeadStatusDistribution";

const Reports = () => {
  const [leadsClosedLastWeek, setLeadsClosedLastWeek] = useState([]);
  const [totalLeadsInPipeline, setTotalLeadsInPipeline] = useState([]);
  const [leadList, setLeadList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];

  const statusDistributionCount = statuses.reduce((acc, curr) => {
    const count = leadList?.filter((item) => item.status === curr).length || 0;

    if (count > 0) {
      acc.push({ status: curr, count });
    }
    return acc;
  }, []);

  const leadsClosedBySalesAgent = leadList?.reduce((acc, curr) => {
    if (curr.status === "Closed") {
      const agentName = curr?.salesAgent?.name;
      acc[agentName] = (acc[agentName] || 0) + 1;
    }
    return acc;
  }, {});

  const fetchTotalLeadsClosed = () => {
    fetch(`https://be-major-project-2.vercel.app/report/last-week`)
      .then((res) => res.json())
      .then((data) => {
        setLeadsClosedLastWeek(data);
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        setError("Failed to Fetch Leads Closed by Last Week.");
        setLeadsClosedLastWeek([]);
      });
  };

  const fetchLeadsInPipeLine = () => {
    fetch(`https://be-major-project-2.vercel.app/report/pipeline`)
      .then((res) => res.json())
      .then((data) => {
        setTotalLeadsInPipeline(data);
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        setError("Failed to Fetch Leads in Pipeline");
        setTotalLeadsInPipeline([]);
      });
  };

  const fetchLeadList = () => {
    fetch(`https://be-major-project-2.vercel.app/leads`)
      .then((res) => res.json())
      .then((data) => {
        setLeadList(data);
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        setError("Failed to Fetch Leads");
        setLeadList("");
      });
  };

  useEffect(() => {
    fetchTotalLeadsClosed();
    fetchLeadsInPipeLine();
    fetchLeadList();
  }, []);
  return (
    <>
      {loading && <p className="text-center alert alert-info">Loading</p>}
      {error && <p className="text-center alert alert-danger">{error}</p>}

      {!loading && (
        <div className="container">
          <h4 className="text-center mb-4 bg-light py-3">Report Overview</h4>
          <div className="row mb-5">
            <div className="col-12 col-md-6 mb-4">
              <LeadClosedBySalesAgent
                salesAgentName={Object.keys(leadsClosedBySalesAgent)}
                counts={Object.values(leadsClosedBySalesAgent)}
              />
            </div>
            <div className="col-12 col-md-6 mb-4">
              <LeadStatusDistribution
                statusDistributionCount={statusDistributionCount}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <TotalLeadsClosed
                totalLeadsClosedByLastWeek={leadsClosedLastWeek}
                totalLeadsInPipeline={totalLeadsInPipeline}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Reports;
