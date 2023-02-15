import PaginationApp from "./PaginationApp";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";


describe('Pagination', () => {
    const handleChange = jest.fn((page, pageSize) => page + pageSize)
    const user = userEvent.setup()

    const props = {
        total: 105,
        pageSize: 10,
        current: 3,
        handler: handleChange
    }

    it('should renders', async function () {
        render(<PaginationApp {...props}/>)
        expect(screen.getByRole('listitem', {name: '1'})).toBeInTheDocument()
        expect(screen.getByRole('listitem', {name: '11'})).toBeInTheDocument()
        expect(screen.queryByRole('listitem', {name: '20'})).not.toBeInTheDocument()
        expect(screen.queryByRole('listitem', {name: '3'})).toHaveClass('ant-pagination-item-active')
    });

    it('should call the callback on click', async function () {
        render(<PaginationApp {...props}/>)
        await user.click(screen.getByRole('listitem', {name: '1'}))
        expect(handleChange).toHaveBeenCalledTimes(1)
        expect(handleChange).toHaveBeenCalledWith(1, 10)
    });
})