import LeadClosedBySalesAgent from "../components/LeadClosedBySalesAgent";
import LeadStatusDistribution from "../components/LeadStatusDistribution";
import TotalLeadsClosed from "../components/TotalLeadsClosed";
import useDefaultContext from "../contexts/defaultContext";
import useFetch from "../hooks/useFetch";

const Reports = () => {
  const { baseUrl, statuses } = useDefaultContext();

  // leads list
  const {
    data: leadList,
    loading: leadListLoader,
    error: leadListError,
  } = useFetch(`${baseUrl}/leads`);

  // leads closed last week
  const {
    data: leadsClosedLastWeek,
    loading: leadsClosedLastWeekLoader,
    error: leadsClosedLastWeekError,
  } = useFetch(`${baseUrl}/report/last-week`);

  // total leads in pipeline
  const {
    data: totalLeadsInPipeline,
    loading: totalLeadsInPipelineLoader,
    error: totalLeadsInPipelineError,
  } = useFetch(`${baseUrl}/report/pipeline`);

  const loading =
    leadListLoader || leadsClosedLastWeekLoader || totalLeadsInPipelineLoader;
  const error =
    leadListError || leadsClosedLastWeekError || totalLeadsInPipelineError;

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

  return (
    <>
      {loading && <p className="text-center alert alert-info">Loading</p>}
      {error && <p className="text-center alert alert-danger">{error}</p>}

      {!loading && (
        <div className="container">
          <h4 className="text-center mb-4 bg-light py-3">Report Overview</h4>

          {/* Charts Row */}
          <div className="row mb-5">
            <div className="col-12 col-md-6 mb-4 chart-container">
              <LeadClosedBySalesAgent
                salesAgentName={Object.keys(leadsClosedBySalesAgent)}
                counts={Object.values(leadsClosedBySalesAgent)}
              />
            </div>
            <div className="col-12 col-md-6 mb-4 chart-container">
              <LeadStatusDistribution
                statusDistributionCount={statusDistributionCount}
              />
            </div>
          </div>

          {/* Summary Row */}
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div
                className="chart-container"
                style={{ width: "400px", margin: "0 auto" }}
              >
                <TotalLeadsClosed
                  totalLeadsClosedByLastWeek={leadsClosedLastWeek}
                  totalLeadsInPipeline={totalLeadsInPipeline}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reports;
