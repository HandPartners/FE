import { Dialog, DialogContent } from "@mui/material";
import { MoonLoader } from "react-spinners";

interface OverlapPartialLoadingProps {
  isLoading: boolean;
}

const OverlapPartialLoading = ({ isLoading }: OverlapPartialLoadingProps) => {
  return (
    <>
      <Dialog open={isLoading}>
        <DialogContent className="loading-dialog">
          <MoonLoader color="#2e3092" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OverlapPartialLoading;
