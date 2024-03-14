<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrdenAceptadaMail extends Mailable
{
    use Queueable, SerializesModels;

    public $orderDetail;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($orderDetail)
    {
        $this->orderDetail = $orderDetail;
    }

    /**
     * Get the message envelope.
     *
     * @return OrdenAceptadaMail
     */
    public function build()
    {
        return $this->from('mail')
                    ->view('emails.orden-aceptada');
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
