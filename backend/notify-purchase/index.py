import os
import json
import urllib.request

def handler(event: dict, context) -> dict:
    """Отправляет уведомление в Telegram о новой покупке привилегии."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    nick = body.get('nick', '').strip()
    privilege = body.get('privilege', '').strip()
    price = body.get('price', '')

    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    text = (
        f"🛒 Новая покупка привилегии!\n\n"
        f"👤 Ник: <b>{nick}</b>\n"
        f"⭐ Привилегия: <b>{privilege}</b>\n"
        f"💰 Сумма: <b>{price} ₽</b>\n\n"
        f"Не забудь выдать привилегию через LuckPerms!"
    )

    payload = json.dumps({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }).encode('utf-8')

    req = urllib.request.Request(
        f'https://api.telegram.org/bot{token}/sendMessage',
        data=payload,
        headers={'Content-Type': 'application/json'}
    )
    urllib.request.urlopen(req)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
