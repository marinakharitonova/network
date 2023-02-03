interface IRequest {
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error?: string
}