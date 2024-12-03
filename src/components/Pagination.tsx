interface Props {
  gotoNextPage: any;
  gotoPrevPage: any;
}

const Pagination = ({ gotoNextPage, gotoPrevPage }: Props) => {
  return (
    <div>
      {/* these are the buttons that help navigate from page to page       */}
      {gotoPrevPage && (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={gotoPrevPage}
        >
          Previous
        </button>
      )}
      {gotoNextPage && (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={gotoNextPage}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
