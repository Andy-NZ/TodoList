import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';
import { ConfirmModal } from "./ConfirmModal"

describe('ConfrimModal', () => {
    const onConfirm = vi.fn()
    const onCancel = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render confirm modal when showModal is true', () => {
        render(<ConfirmModal showModal={true} {...{ onConfirm, onCancel }} />)

        expect(screen.getByText('Confirm')).toBeInTheDocument()
        expect(screen.getByText('Are you sure you want to delete it?')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    })

    it('should not render confirm modal when showModal is false', () => {
        render(<ConfirmModal showModal={false} {...{ onConfirm, onCancel }} />)

        expect(screen.queryByText('Confirm')).toBeNull()
    })

    it('should trigger onCofirm when "OK" button is clicked', async () => {
        render(<ConfirmModal showModal={true} {...{ onConfirm, onCancel }} />)

        await userEvent.click(screen.getByRole('button', { name: 'Delete' }))
        expect(onConfirm).toBeCalled()
    })

    it('should trigger onCofirm when "Cancel" button is clicked', async () => {
        render(<ConfirmModal showModal={true} {...{ onConfirm, onCancel }} />)

        await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
        expect(onCancel).toBeCalled()
    })
})